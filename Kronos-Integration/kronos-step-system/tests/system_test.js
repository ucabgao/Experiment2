/* global describe, it, xit */
/* jslint node: true, esnext: true */
"use strict";
var chai = require('chai'), assert = chai.assert, expect = chai.expect, should = chai.should();
chai.use(require("chai-as-promised"));
var path = require('path'), fs = require('fs');
var testStep = require('kronos-test-step'), endpoint = require('kronos-step').endpoint;
var manager = testStep.managerMock;
require('../system').registerWithManager(manager);
describe('system', function () {
    var sys = manager.steps['kronos-system'].createInstance(manager, undefined, {
        name: "myStep",
        type: "kronos-system",
        command: "cat",
        args: ['-u' /*, '/dev/zero'*/ /*, path.join(__dirname, 'system.js')*/]
    });
    var stdinEndpoint = new endpoint.SendEndpoint('stdin-test');
    stdinEndpoint.connected = sys.endpoints.stdin;
    var stdoutEndpoint = new endpoint.ReceiveEndpoint('stdout-test');
    sys.endpoints.stdout.connected = stdoutEndpoint;
    function StreamPromise(stream) {
        return new Promise(function (fullfilled, rejected) {
            stream.on('end', function () {
                fullfilled("StreamPromise");
            });
        });
    }
    var stdoutRequest;
    stdoutEndpoint.receive = function (request) {
        stdoutRequest = request;
        stdoutRequest.stream.pipe(process.stdout);
        return StreamPromise(stdoutRequest.stream);
    };
    var stderrEndpoint = new endpoint.ReceiveEndpoint('stderr-test');
    sys.endpoints.stderr.connected = stderrEndpoint;
    var stderrRequest;
    stderrEndpoint.receive = function (request) {
        stderrRequest = request;
        return StreamPromise(request.stream);
    };
    describe('static', function () {
        testStep.checkStepStatic(manager, sys);
    });
    describe('live-cycle', function () {
        var wasRunning = false;
        testStep.checkStepLivecycle(manager, sys, function (step, state, livecycle, done) {
            if (state === 'running' && !wasRunning) {
                //console.log(`${state}: ${livecycle.statesHistory}`);
                var PROCESSES = 5;
                for (var i = 0; i < PROCESSES; i++) {
                    var stream = fs.createReadStream(path.join(__dirname, 'system_test.js'), {
                        encoding: 'utf8'
                    });
                    stdinEndpoint.send({
                        stream: stream,
                        info: {
                            id: i
                        }
                    }).then(function (r) {
                        console.log("response: " + r);
                    });
                }
                wasRunning = true;
                setTimeout(function () {
                    console.log("wait over...");
                    done();
                }, 1000);
                return;
            }
            if (state === 'stopped' && wasRunning) {
                assert.equal(stdoutRequest.info.command, 'cat');
            }
            done();
        });
    });
});
