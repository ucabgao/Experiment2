﻿/*
	jWidget Lib source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Orderer<T, JW.AbstractMap<T>>`
 *
 * See JW.AbstractCollection.Orderer for details.
 *
 * @extends JW.AbstractCollection.Orderer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractMap.Orderer = function(source, config) {
	JW.AbstractMap.Orderer._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Orderer, JW.AbstractCollection.Orderer, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
});
