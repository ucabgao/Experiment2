/**
 * Overwritting the original spying functions in scope.js
 * This is done so we now have a before AND an after callback on the spy
 *
 * @see http://code.jquery.com/jquery-1.10.2.js
 * @see http://code.jquery.com/jquery-2.0.3.js
 */
/* global document: true, window: true */

exports.version = '0.2';

exports.module = function(phantomas) {
    'use strict';

    var responseEndTime = Date.now();

    phantomas.on('responseEnd', function() {
        responseEndTime = Date.now();
    });

    phantomas.once('init', function() {
        phantomas.evaluate(function(responseEndTime, deepAnalysis) {
            (function(phantomas) {
    
                // Overwritting phantomas spy function
                (function() {
                    var enabled = true;

                    // turn off spying to not include internal phantomas actions
                    function spyEnabled(state, reason) {
                        enabled = (state === true);

                        phantomas.log('Spying ' + (enabled ? 'enabled' : 'disabled') + (reason ? ' - ' + reason : ''));
                    }

                    phantomas.log('Overwritting phantomas spy function');

                    function spy(obj, fn, callbackBefore, callbackAfter) {
                        var origFn = obj && obj[fn];

                        if (typeof origFn !== 'function') {
                            return false;
                        }

                        phantomas.log('Attaching a YLT spy to "' + fn + '" function...');

                        obj[fn] = function() {
                            var result;
                            var err;
                            
                            // Before
                            if (enabled) {
                                callbackBefore.apply(this, arguments);
                            }

                            // Execute
                            try {

                                result = origFn.apply(this, arguments);

                            } catch(e) {

                                // Catching the err for the moment, because we need to make sure the callbackAfter function is called.

                                phantomas.log('Error catched on spyed function "' + fn + '": ' + e);
                                phantomas.log(arguments);

                                err = e;

                            } finally {

                                // After
                                if (enabled && callbackAfter) {
                                    callbackAfter.call(this, result, arguments);
                                }

                                if (err) {
                                    phantomas.log('Re-throwing the error');
                                    throw err;
                                }
                            }

                            return result;
                        };

                        // copy custom properties of original function to the mocked one
                        Object.keys(origFn).forEach(function(key) {
                            obj[fn][key] = origFn[key];
                        });

                        obj[fn].prototype = origFn.prototype;

                        return true;
                    }

                    phantomas.spyEnabled = spyEnabled;
                    phantomas.spy = spy;
                })();



                // Adding some code for the Javascript execution tree construction
                (function() {

                    var root = new ContextTreeNode(null, {type: 'main'});
                    var currentContext = root;
                    var depth = 0;

                    if (deepAnalysis) {
                        phantomas.log('Entering deep Javascript analysis mode');
                    }

                    // Add a child but don't enter his context
                    function pushContext(data) {
                        if (depth === 0 || deepAnalysis) {
                            data.timestamp = Date.now() - responseEndTime;
                            data.loadingStep = phantomas.currentStep || '';
                            currentContext.addChild(data);
                        }
                    }
                    
                    // Add a child to the current context and enter his context
                    function enterContext(data) {
                        if (depth === 0 || deepAnalysis) {
                            data.timestamp = Date.now() - responseEndTime;
                            data.loadingStep = phantomas.currentStep || '';
                            currentContext = currentContext.addChild(data);
                        }
                        depth ++;
                    }
                    
                    // Save given data in the current context and jump change current context to its parent
                    function leaveContext(moreData) {
                        if (depth === 1 || deepAnalysis) {
                            currentContext.data.time = Date.now() - currentContext.data.timestamp - responseEndTime;

                            // Merge previous data with moreData (ovewrites if exists)
                            if (moreData) {
                                for (var key in moreData) {
                                    currentContext.data[key] = moreData[key];
                                }
                            }

                            var parent = currentContext.parent;
                            if (parent === null) {
                                console.error('Error: trying to close root context in ContextTree');
                            } else {
                                currentContext = parent;
                            }
                        }
                        depth --;
                    }
                    
                    function getContextData() {
                        return currentContext.data;
                    }
                    
                    // Returns a clean object, without the parent which causes recursive loops
                    function readFullTree() {
                        // Return null if the contextTree is not correctly closed
                        if (root !== currentContext) {
                            return null;
                        }
                        var current = currentContext;

                        function recusiveRead(node) {
                            if (node.children.length === 0) {
                                delete node.children;
                            } else {
                                for (var i=0, max=node.children.length ; i<max ; i++) {
                                    recusiveRead(node.children[i]);
                                }
                            }
                            delete node.parent;
                        }
                        recusiveRead(root);

                        return root;
                    }

                    // Empty the tree
                    function resetTree() {
                        root = new ContextTreeNode(null, {type: 'main'});
                        currentContext = root;
                        depth = 0;
                    }
                    

                    function ContextTreeNode(parent, data) {
                        this.data = data;
                        this.parent = parent;
                        this.children = [];

                        this.addChild = function(data) {
                            var child = new ContextTreeNode(this, data);
                            this.children.push(child);
                            return child;
                        };
                    }

                    phantomas.log('Adding some contextTree functions to phantomas');
                    phantomas.pushContext = pushContext;
                    phantomas.enterContext = enterContext;
                    phantomas.leaveContext = leaveContext;
                    phantomas.getContextData = getContextData;
                    phantomas.readFullTree = readFullTree;
                    phantomas.resetTree = resetTree;

                })();

            })(window.__phantomas);
        }, responseEndTime, phantomas.getParam('js-deep-analysis'));
    });
};
