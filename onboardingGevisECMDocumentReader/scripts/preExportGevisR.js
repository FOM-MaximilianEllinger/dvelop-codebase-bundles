//#region \0rolldown/runtime.js
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
//#endregion
//#region node_modules/xmlbuilder/lib/Utility.js
var require_Utility = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject, hasProp = {}.hasOwnProperty;
		assign = function(target, ...sources) {
			var i, key, len, source;
			if (isFunction(Object.assign)) Object.assign.apply(null, arguments);
			else for (i = 0, len = sources.length; i < len; i++) {
				source = sources[i];
				if (source != null) for (key in source) {
					if (!hasProp.call(source, key)) continue;
					target[key] = source[key];
				}
			}
			return target;
		};
		isFunction = function(val) {
			return !!val && Object.prototype.toString.call(val) === "[object Function]";
		};
		isObject = function(val) {
			var ref;
			return !!val && ((ref = typeof val) === "function" || ref === "object");
		};
		isArray = function(val) {
			if (isFunction(Array.isArray)) return Array.isArray(val);
			else return Object.prototype.toString.call(val) === "[object Array]";
		};
		isEmpty = function(val) {
			var key;
			if (isArray(val)) return !val.length;
			else {
				for (key in val) {
					if (!hasProp.call(val, key)) continue;
					return false;
				}
				return true;
			}
		};
		isPlainObject = function(val) {
			var ctor, proto;
			return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === "function" && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
		};
		getValue = function(obj) {
			if (isFunction(obj.valueOf)) return obj.valueOf();
			else return obj;
		};
		module.exports.assign = assign;
		module.exports.isFunction = isFunction;
		module.exports.isObject = isObject;
		module.exports.isArray = isArray;
		module.exports.isEmpty = isEmpty;
		module.exports.isPlainObject = isPlainObject;
		module.exports.getValue = getValue;
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDOMImplementation.js
var require_XMLDOMImplementation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = class XMLDOMImplementation {
			hasFeature(feature, version) {
				return true;
			}
			createDocumentType(qualifiedName, publicId, systemId) {
				throw new Error("This DOM method is not implemented.");
			}
			createDocument(namespaceURI, qualifiedName, doctype) {
				throw new Error("This DOM method is not implemented.");
			}
			createHTMLDocument(title) {
				throw new Error("This DOM method is not implemented.");
			}
			getFeature(feature, version) {
				throw new Error("This DOM method is not implemented.");
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js
var require_XMLDOMErrorHandler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = class XMLDOMErrorHandler {
			constructor() {}
			handleError(error) {
				throw new Error(error);
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDOMStringList.js
var require_XMLDOMStringList = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = (function() {
			class XMLDOMStringList {
				constructor(arr) {
					this.arr = arr || [];
				}
				item(index) {
					return this.arr[index] || null;
				}
				contains(str) {
					return this.arr.indexOf(str) !== -1;
				}
			}
			Object.defineProperty(XMLDOMStringList.prototype, "length", { get: function() {
				return this.arr.length;
			} });
			return XMLDOMStringList;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDOMConfiguration.js
var require_XMLDOMConfiguration = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var XMLDOMErrorHandler = require_XMLDOMErrorHandler(), XMLDOMStringList = require_XMLDOMStringList();
		module.exports = (function() {
			class XMLDOMConfiguration {
				constructor() {
					this.defaultParams = {
						"canonical-form": false,
						"cdata-sections": false,
						"comments": false,
						"datatype-normalization": false,
						"element-content-whitespace": true,
						"entities": true,
						"error-handler": new XMLDOMErrorHandler(),
						"infoset": true,
						"validate-if-schema": false,
						"namespaces": true,
						"namespace-declarations": true,
						"normalize-characters": false,
						"schema-location": "",
						"schema-type": "",
						"split-cdata-sections": true,
						"validate": false,
						"well-formed": true
					};
					this.params = Object.create(this.defaultParams);
				}
				getParameter(name) {
					if (this.params.hasOwnProperty(name)) return this.params[name];
					else return null;
				}
				canSetParameter(name, value) {
					return true;
				}
				setParameter(name, value) {
					if (value != null) return this.params[name] = value;
					else return delete this.params[name];
				}
			}
			Object.defineProperty(XMLDOMConfiguration.prototype, "parameterNames", { get: function() {
				return new XMLDOMStringList(Object.keys(this.defaultParams));
			} });
			return XMLDOMConfiguration;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/NodeType.js
var require_NodeType = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = {
			Element: 1,
			Attribute: 2,
			Text: 3,
			CData: 4,
			EntityReference: 5,
			EntityDeclaration: 6,
			ProcessingInstruction: 7,
			Comment: 8,
			Document: 9,
			DocType: 10,
			DocumentFragment: 11,
			NotationDeclaration: 12,
			Declaration: 201,
			Raw: 202,
			AttributeDeclaration: 203,
			ElementDeclaration: 204,
			Dummy: 205
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLAttribute.js
var require_XMLAttribute = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType = require_NodeType();
		require_XMLNode();
		module.exports = (function() {
			class XMLAttribute {
				constructor(parent, name, value) {
					this.parent = parent;
					if (this.parent) {
						this.options = this.parent.options;
						this.stringify = this.parent.stringify;
					}
					if (name == null) throw new Error("Missing attribute name. " + this.debugInfo(name));
					this.name = this.stringify.name(name);
					this.value = this.stringify.attValue(value);
					this.type = NodeType.Attribute;
					this.isId = false;
					this.schemaTypeInfo = null;
				}
				clone() {
					return Object.create(this);
				}
				toString(options) {
					return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
				}
				debugInfo(name) {
					name = name || this.name;
					if (name == null) return "parent: <" + this.parent.name + ">";
					else return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
				}
				isEqualNode(node) {
					if (node.namespaceURI !== this.namespaceURI) return false;
					if (node.prefix !== this.prefix) return false;
					if (node.localName !== this.localName) return false;
					if (node.value !== this.value) return false;
					return true;
				}
			}
			Object.defineProperty(XMLAttribute.prototype, "nodeType", { get: function() {
				return this.type;
			} });
			Object.defineProperty(XMLAttribute.prototype, "ownerElement", { get: function() {
				return this.parent;
			} });
			Object.defineProperty(XMLAttribute.prototype, "textContent", {
				get: function() {
					return this.value;
				},
				set: function(value) {
					return this.value = value || "";
				}
			});
			Object.defineProperty(XMLAttribute.prototype, "namespaceURI", { get: function() {
				return "";
			} });
			Object.defineProperty(XMLAttribute.prototype, "prefix", { get: function() {
				return "";
			} });
			Object.defineProperty(XMLAttribute.prototype, "localName", { get: function() {
				return this.name;
			} });
			Object.defineProperty(XMLAttribute.prototype, "specified", { get: function() {
				return true;
			} });
			return XMLAttribute;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLNamedNodeMap.js
var require_XMLNamedNodeMap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = (function() {
			class XMLNamedNodeMap {
				constructor(nodes) {
					this.nodes = nodes;
				}
				clone() {
					return this.nodes = null;
				}
				getNamedItem(name) {
					return this.nodes[name];
				}
				setNamedItem(node) {
					var oldNode = this.nodes[node.nodeName];
					this.nodes[node.nodeName] = node;
					return oldNode || null;
				}
				removeNamedItem(name) {
					var oldNode = this.nodes[name];
					delete this.nodes[name];
					return oldNode || null;
				}
				item(index) {
					return this.nodes[Object.keys(this.nodes)[index]] || null;
				}
				getNamedItemNS(namespaceURI, localName) {
					throw new Error("This DOM method is not implemented.");
				}
				setNamedItemNS(node) {
					throw new Error("This DOM method is not implemented.");
				}
				removeNamedItemNS(namespaceURI, localName) {
					throw new Error("This DOM method is not implemented.");
				}
			}
			Object.defineProperty(XMLNamedNodeMap.prototype, "length", { get: function() {
				return Object.keys(this.nodes).length || 0;
			} });
			return XMLNamedNodeMap;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLElement.js
var require_XMLElement = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLAttribute, XMLNamedNodeMap, XMLNode, getValue, isFunction, isObject, hasProp = {}.hasOwnProperty;
		({isObject, isFunction, getValue} = require_Utility());
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		XMLAttribute = require_XMLAttribute();
		XMLNamedNodeMap = require_XMLNamedNodeMap();
		module.exports = (function() {
			class XMLElement extends XMLNode {
				constructor(parent, name, attributes) {
					var child, j, len, ref;
					super(parent);
					if (name == null) throw new Error("Missing element name. " + this.debugInfo());
					this.name = this.stringify.name(name);
					this.type = NodeType.Element;
					this.attribs = {};
					this.schemaTypeInfo = null;
					if (attributes != null) this.attribute(attributes);
					if (parent.type === NodeType.Document) {
						this.isRoot = true;
						this.documentObject = parent;
						parent.rootObject = this;
						if (parent.children) {
							ref = parent.children;
							for (j = 0, len = ref.length; j < len; j++) {
								child = ref[j];
								if (child.type === NodeType.DocType) {
									child.name = this.name;
									break;
								}
							}
						}
					}
				}
				clone() {
					var att, attName, clonedSelf = Object.create(this), ref;
					if (clonedSelf.isRoot) clonedSelf.documentObject = null;
					clonedSelf.attribs = {};
					ref = this.attribs;
					for (attName in ref) {
						if (!hasProp.call(ref, attName)) continue;
						att = ref[attName];
						clonedSelf.attribs[attName] = att.clone();
					}
					clonedSelf.children = [];
					this.children.forEach(function(child) {
						var clonedChild = child.clone();
						clonedChild.parent = clonedSelf;
						return clonedSelf.children.push(clonedChild);
					});
					return clonedSelf;
				}
				attribute(name, value) {
					var attName, attValue;
					if (name != null) name = getValue(name);
					if (isObject(name)) for (attName in name) {
						if (!hasProp.call(name, attName)) continue;
						attValue = name[attName];
						this.attribute(attName, attValue);
					}
					else {
						if (isFunction(value)) value = value.apply();
						if (this.options.keepNullAttributes && value == null) this.attribs[name] = new XMLAttribute(this, name, "");
						else if (value != null) this.attribs[name] = new XMLAttribute(this, name, value);
					}
					return this;
				}
				removeAttribute(name) {
					var attName, j, len;
					if (name == null) throw new Error("Missing attribute name. " + this.debugInfo());
					name = getValue(name);
					if (Array.isArray(name)) for (j = 0, len = name.length; j < len; j++) {
						attName = name[j];
						delete this.attribs[attName];
					}
					else delete this.attribs[name];
					return this;
				}
				toString(options) {
					return this.options.writer.element(this, this.options.writer.filterOptions(options));
				}
				att(name, value) {
					return this.attribute(name, value);
				}
				a(name, value) {
					return this.attribute(name, value);
				}
				getAttribute(name) {
					if (this.attribs.hasOwnProperty(name)) return this.attribs[name].value;
					else return null;
				}
				setAttribute(name, value) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getAttributeNode(name) {
					if (this.attribs.hasOwnProperty(name)) return this.attribs[name];
					else return null;
				}
				setAttributeNode(newAttr) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				removeAttributeNode(oldAttr) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getElementsByTagName(name) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getAttributeNS(namespaceURI, localName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				setAttributeNS(namespaceURI, qualifiedName, value) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				removeAttributeNS(namespaceURI, localName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getAttributeNodeNS(namespaceURI, localName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				setAttributeNodeNS(newAttr) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getElementsByTagNameNS(namespaceURI, localName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				hasAttribute(name) {
					return this.attribs.hasOwnProperty(name);
				}
				hasAttributeNS(namespaceURI, localName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				setIdAttribute(name, isId) {
					if (this.attribs.hasOwnProperty(name)) return this.attribs[name].isId;
					else return isId;
				}
				setIdAttributeNS(namespaceURI, localName, isId) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				setIdAttributeNode(idAttr, isId) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getElementsByTagName(tagname) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getElementsByTagNameNS(namespaceURI, localName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getElementsByClassName(classNames) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				isEqualNode(node) {
					var i, j, ref;
					if (!super.isEqualNode(node)) return false;
					if (node.namespaceURI !== this.namespaceURI) return false;
					if (node.prefix !== this.prefix) return false;
					if (node.localName !== this.localName) return false;
					if (node.attribs.length !== this.attribs.length) return false;
					for (i = j = 0, ref = this.attribs.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) if (!this.attribs[i].isEqualNode(node.attribs[i])) return false;
					return true;
				}
			}
			Object.defineProperty(XMLElement.prototype, "tagName", { get: function() {
				return this.name;
			} });
			Object.defineProperty(XMLElement.prototype, "namespaceURI", { get: function() {
				return "";
			} });
			Object.defineProperty(XMLElement.prototype, "prefix", { get: function() {
				return "";
			} });
			Object.defineProperty(XMLElement.prototype, "localName", { get: function() {
				return this.name;
			} });
			Object.defineProperty(XMLElement.prototype, "id", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			Object.defineProperty(XMLElement.prototype, "className", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			Object.defineProperty(XMLElement.prototype, "classList", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			Object.defineProperty(XMLElement.prototype, "attributes", { get: function() {
				if (!this.attributeMap || !this.attributeMap.nodes) this.attributeMap = new XMLNamedNodeMap(this.attribs);
				return this.attributeMap;
			} });
			return XMLElement;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLCharacterData.js
var require_XMLCharacterData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var XMLNode = require_XMLNode();
		module.exports = (function() {
			class XMLCharacterData extends XMLNode {
				constructor(parent) {
					super(parent);
					this.value = "";
				}
				clone() {
					return Object.create(this);
				}
				substringData(offset, count) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				appendData(arg) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				insertData(offset, arg) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				deleteData(offset, count) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				replaceData(offset, count, arg) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				isEqualNode(node) {
					if (!super.isEqualNode(node)) return false;
					if (node.data !== this.data) return false;
					return true;
				}
			}
			Object.defineProperty(XMLCharacterData.prototype, "data", {
				get: function() {
					return this.value;
				},
				set: function(value) {
					return this.value = value || "";
				}
			});
			Object.defineProperty(XMLCharacterData.prototype, "length", { get: function() {
				return this.value.length;
			} });
			Object.defineProperty(XMLCharacterData.prototype, "textContent", {
				get: function() {
					return this.value;
				},
				set: function(value) {
					return this.value = value || "";
				}
			});
			return XMLCharacterData;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLCData.js
var require_XMLCData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType = require_NodeType(), XMLCharacterData = require_XMLCharacterData();
		module.exports = class XMLCData extends XMLCharacterData {
			constructor(parent, text) {
				super(parent);
				if (text == null) throw new Error("Missing CDATA text. " + this.debugInfo());
				this.name = "#cdata-section";
				this.type = NodeType.CData;
				this.value = this.stringify.cdata(text);
			}
			clone() {
				return Object.create(this);
			}
			toString(options) {
				return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLComment.js
var require_XMLComment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType = require_NodeType(), XMLCharacterData = require_XMLCharacterData();
		module.exports = class XMLComment extends XMLCharacterData {
			constructor(parent, text) {
				super(parent);
				if (text == null) throw new Error("Missing comment text. " + this.debugInfo());
				this.name = "#comment";
				this.type = NodeType.Comment;
				this.value = this.stringify.comment(text);
			}
			clone() {
				return Object.create(this);
			}
			toString(options) {
				return this.options.writer.comment(this, this.options.writer.filterOptions(options));
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDeclaration.js
var require_XMLDeclaration = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode, isObject;
		({isObject} = require_Utility());
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = class XMLDeclaration extends XMLNode {
			constructor(parent, version, encoding, standalone) {
				super(parent);
				if (isObject(version)) ({version, encoding, standalone} = version);
				if (!version) version = "1.0";
				this.type = NodeType.Declaration;
				this.version = this.stringify.xmlVersion(version);
				if (encoding != null) this.encoding = this.stringify.xmlEncoding(encoding);
				if (standalone != null) this.standalone = this.stringify.xmlStandalone(standalone);
			}
			toString(options) {
				return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDTDAttList.js
var require_XMLDTDAttList = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = class XMLDTDAttList extends XMLNode {
			constructor(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
				super(parent);
				if (elementName == null) throw new Error("Missing DTD element name. " + this.debugInfo());
				if (attributeName == null) throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
				if (!attributeType) throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
				if (!defaultValueType) throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
				if (defaultValueType.indexOf("#") !== 0) defaultValueType = "#" + defaultValueType;
				if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
				if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
				this.elementName = this.stringify.name(elementName);
				this.type = NodeType.AttributeDeclaration;
				this.attributeName = this.stringify.name(attributeName);
				this.attributeType = this.stringify.dtdAttType(attributeType);
				if (defaultValue) this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
				this.defaultValueType = defaultValueType;
			}
			toString(options) {
				return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDTDEntity.js
var require_XMLDTDEntity = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode, isObject;
		({isObject} = require_Utility());
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = (function() {
			class XMLDTDEntity extends XMLNode {
				constructor(parent, pe, name, value) {
					super(parent);
					if (name == null) throw new Error("Missing DTD entity name. " + this.debugInfo(name));
					if (value == null) throw new Error("Missing DTD entity value. " + this.debugInfo(name));
					this.pe = !!pe;
					this.name = this.stringify.name(name);
					this.type = NodeType.EntityDeclaration;
					if (!isObject(value)) {
						this.value = this.stringify.dtdEntityValue(value);
						this.internal = true;
					} else {
						if (!value.pubID && !value.sysID) throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
						if (value.pubID && !value.sysID) throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
						this.internal = false;
						if (value.pubID != null) this.pubID = this.stringify.dtdPubID(value.pubID);
						if (value.sysID != null) this.sysID = this.stringify.dtdSysID(value.sysID);
						if (value.nData != null) this.nData = this.stringify.dtdNData(value.nData);
						if (this.pe && this.nData) throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
					}
				}
				toString(options) {
					return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
				}
			}
			Object.defineProperty(XMLDTDEntity.prototype, "publicId", { get: function() {
				return this.pubID;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "systemId", { get: function() {
				return this.sysID;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "notationName", { get: function() {
				return this.nData || null;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "inputEncoding", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "xmlEncoding", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "xmlVersion", { get: function() {
				return null;
			} });
			return XMLDTDEntity;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDTDElement.js
var require_XMLDTDElement = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = class XMLDTDElement extends XMLNode {
			constructor(parent, name, value) {
				super(parent);
				if (name == null) throw new Error("Missing DTD element name. " + this.debugInfo());
				if (!value) value = "(#PCDATA)";
				if (Array.isArray(value)) value = "(" + value.join(",") + ")";
				this.name = this.stringify.name(name);
				this.type = NodeType.ElementDeclaration;
				this.value = this.stringify.dtdElementValue(value);
			}
			toString(options) {
				return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDTDNotation.js
var require_XMLDTDNotation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = (function() {
			class XMLDTDNotation extends XMLNode {
				constructor(parent, name, value) {
					super(parent);
					if (name == null) throw new Error("Missing DTD notation name. " + this.debugInfo(name));
					if (!value.pubID && !value.sysID) throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
					this.name = this.stringify.name(name);
					this.type = NodeType.NotationDeclaration;
					if (value.pubID != null) this.pubID = this.stringify.dtdPubID(value.pubID);
					if (value.sysID != null) this.sysID = this.stringify.dtdSysID(value.sysID);
				}
				toString(options) {
					return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
				}
			}
			Object.defineProperty(XMLDTDNotation.prototype, "publicId", { get: function() {
				return this.pubID;
			} });
			Object.defineProperty(XMLDTDNotation.prototype, "systemId", { get: function() {
				return this.sysID;
			} });
			return XMLDTDNotation;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDocType.js
var require_XMLDocType = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLNamedNodeMap, XMLNode, isObject;
		({isObject} = require_Utility());
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		XMLDTDAttList = require_XMLDTDAttList();
		XMLDTDEntity = require_XMLDTDEntity();
		XMLDTDElement = require_XMLDTDElement();
		XMLDTDNotation = require_XMLDTDNotation();
		XMLNamedNodeMap = require_XMLNamedNodeMap();
		module.exports = (function() {
			class XMLDocType extends XMLNode {
				constructor(parent, pubID, sysID) {
					var child, i, len, ref;
					super(parent);
					this.type = NodeType.DocType;
					if (parent.children) {
						ref = parent.children;
						for (i = 0, len = ref.length; i < len; i++) {
							child = ref[i];
							if (child.type === NodeType.Element) {
								this.name = child.name;
								break;
							}
						}
					}
					this.documentObject = parent;
					if (isObject(pubID)) ({pubID, sysID} = pubID);
					if (sysID == null) [sysID, pubID] = [pubID, sysID];
					if (pubID != null) this.pubID = this.stringify.dtdPubID(pubID);
					if (sysID != null) this.sysID = this.stringify.dtdSysID(sysID);
				}
				element(name, value) {
					var child = new XMLDTDElement(this, name, value);
					this.children.push(child);
					return this;
				}
				attList(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
					var child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
					this.children.push(child);
					return this;
				}
				entity(name, value) {
					var child = new XMLDTDEntity(this, false, name, value);
					this.children.push(child);
					return this;
				}
				pEntity(name, value) {
					var child = new XMLDTDEntity(this, true, name, value);
					this.children.push(child);
					return this;
				}
				notation(name, value) {
					var child = new XMLDTDNotation(this, name, value);
					this.children.push(child);
					return this;
				}
				toString(options) {
					return this.options.writer.docType(this, this.options.writer.filterOptions(options));
				}
				ele(name, value) {
					return this.element(name, value);
				}
				att(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
					return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
				}
				ent(name, value) {
					return this.entity(name, value);
				}
				pent(name, value) {
					return this.pEntity(name, value);
				}
				not(name, value) {
					return this.notation(name, value);
				}
				up() {
					return this.root() || this.documentObject;
				}
				isEqualNode(node) {
					if (!super.isEqualNode(node)) return false;
					if (node.name !== this.name) return false;
					if (node.publicId !== this.publicId) return false;
					if (node.systemId !== this.systemId) return false;
					return true;
				}
			}
			Object.defineProperty(XMLDocType.prototype, "entities", { get: function() {
				var child, i, len, nodes = {}, ref = this.children;
				for (i = 0, len = ref.length; i < len; i++) {
					child = ref[i];
					if (child.type === NodeType.EntityDeclaration && !child.pe) nodes[child.name] = child;
				}
				return new XMLNamedNodeMap(nodes);
			} });
			Object.defineProperty(XMLDocType.prototype, "notations", { get: function() {
				var child, i, len, nodes = {}, ref = this.children;
				for (i = 0, len = ref.length; i < len; i++) {
					child = ref[i];
					if (child.type === NodeType.NotationDeclaration) nodes[child.name] = child;
				}
				return new XMLNamedNodeMap(nodes);
			} });
			Object.defineProperty(XMLDocType.prototype, "publicId", { get: function() {
				return this.pubID;
			} });
			Object.defineProperty(XMLDocType.prototype, "systemId", { get: function() {
				return this.sysID;
			} });
			Object.defineProperty(XMLDocType.prototype, "internalSubset", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			return XMLDocType;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLRaw.js
var require_XMLRaw = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType = require_NodeType(), XMLNode = require_XMLNode();
		module.exports = class XMLRaw extends XMLNode {
			constructor(parent, text) {
				super(parent);
				if (text == null) throw new Error("Missing raw text. " + this.debugInfo());
				this.type = NodeType.Raw;
				this.value = this.stringify.raw(text);
			}
			clone() {
				return Object.create(this);
			}
			toString(options) {
				return this.options.writer.raw(this, this.options.writer.filterOptions(options));
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLText.js
var require_XMLText = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType = require_NodeType(), XMLCharacterData = require_XMLCharacterData();
		module.exports = (function() {
			class XMLText extends XMLCharacterData {
				constructor(parent, text) {
					super(parent);
					if (text == null) throw new Error("Missing element text. " + this.debugInfo());
					this.name = "#text";
					this.type = NodeType.Text;
					this.value = this.stringify.text(text);
				}
				clone() {
					return Object.create(this);
				}
				toString(options) {
					return this.options.writer.text(this, this.options.writer.filterOptions(options));
				}
				splitText(offset) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				replaceWholeText(content) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
			}
			Object.defineProperty(XMLText.prototype, "isElementContentWhitespace", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			Object.defineProperty(XMLText.prototype, "wholeText", { get: function() {
				var next, prev, str = "";
				prev = this.previousSibling;
				while (prev) {
					str = prev.data + str;
					prev = prev.previousSibling;
				}
				str += this.data;
				next = this.nextSibling;
				while (next) {
					str = str + next.data;
					next = next.nextSibling;
				}
				return str;
			} });
			return XMLText;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLProcessingInstruction.js
var require_XMLProcessingInstruction = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType = require_NodeType(), XMLCharacterData = require_XMLCharacterData();
		module.exports = class XMLProcessingInstruction extends XMLCharacterData {
			constructor(parent, target, value) {
				super(parent);
				if (target == null) throw new Error("Missing instruction target. " + this.debugInfo());
				this.type = NodeType.ProcessingInstruction;
				this.target = this.stringify.insTarget(target);
				this.name = this.target;
				if (value) this.value = this.stringify.insValue(value);
			}
			clone() {
				return Object.create(this);
			}
			toString(options) {
				return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
			}
			isEqualNode(node) {
				if (!super.isEqualNode(node)) return false;
				if (node.target !== this.target) return false;
				return true;
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDummy.js
var require_XMLDummy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = class XMLDummy extends XMLNode {
			constructor(parent) {
				super(parent);
				this.type = NodeType.Dummy;
			}
			clone() {
				return Object.create(this);
			}
			toString(options) {
				return "";
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLNodeList.js
var require_XMLNodeList = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = (function() {
			class XMLNodeList {
				constructor(nodes) {
					this.nodes = nodes;
				}
				clone() {
					return this.nodes = null;
				}
				item(index) {
					return this.nodes[index] || null;
				}
			}
			Object.defineProperty(XMLNodeList.prototype, "length", { get: function() {
				return this.nodes.length || 0;
			} });
			return XMLNodeList;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/DocumentPosition.js
var require_DocumentPosition = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = {
			Disconnected: 1,
			Preceding: 2,
			Following: 4,
			Contains: 8,
			ContainedBy: 16,
			ImplementationSpecific: 32
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLNode.js
var require_XMLNode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var DocumentPosition, NodeType, XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLNodeList, XMLProcessingInstruction, XMLRaw, XMLText, getValue, isEmpty, isFunction, isObject, hasProp = {}.hasOwnProperty, splice = [].splice;
		({isObject, isFunction, isEmpty, getValue} = require_Utility());
		XMLElement = null;
		XMLCData = null;
		XMLComment = null;
		XMLDeclaration = null;
		XMLDocType = null;
		XMLRaw = null;
		XMLText = null;
		XMLProcessingInstruction = null;
		XMLDummy = null;
		NodeType = null;
		XMLNodeList = null;
		DocumentPosition = null;
		module.exports = (function() {
			class XMLNode {
				constructor(parent1) {
					this.parent = parent1;
					if (this.parent) {
						this.options = this.parent.options;
						this.stringify = this.parent.stringify;
					}
					this.value = null;
					this.children = [];
					this.baseURI = null;
					if (!XMLElement) {
						XMLElement = require_XMLElement();
						XMLCData = require_XMLCData();
						XMLComment = require_XMLComment();
						XMLDeclaration = require_XMLDeclaration();
						XMLDocType = require_XMLDocType();
						XMLRaw = require_XMLRaw();
						XMLText = require_XMLText();
						XMLProcessingInstruction = require_XMLProcessingInstruction();
						XMLDummy = require_XMLDummy();
						NodeType = require_NodeType();
						XMLNodeList = require_XMLNodeList();
						require_XMLNamedNodeMap();
						DocumentPosition = require_DocumentPosition();
					}
				}
				setParent(parent) {
					var child, j, len, ref1, results;
					this.parent = parent;
					if (parent) {
						this.options = parent.options;
						this.stringify = parent.stringify;
					}
					ref1 = this.children;
					results = [];
					for (j = 0, len = ref1.length; j < len; j++) {
						child = ref1[j];
						results.push(child.setParent(this));
					}
					return results;
				}
				element(name, attributes, text) {
					var childNode, item, j, k, key, lastChild = null, len, len1, val;
					if (attributes === null && text == null) [attributes, text] = [{}, null];
					if (attributes == null) attributes = {};
					attributes = getValue(attributes);
					if (!isObject(attributes)) [text, attributes] = [attributes, text];
					if (name != null) name = getValue(name);
					if (Array.isArray(name)) for (j = 0, len = name.length; j < len; j++) {
						item = name[j];
						lastChild = this.element(item);
					}
					else if (isFunction(name)) lastChild = this.element(name.apply());
					else if (isObject(name)) for (key in name) {
						if (!hasProp.call(name, key)) continue;
						val = name[key];
						if (isFunction(val)) val = val.apply();
						if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
						else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) lastChild = this.dummy();
						else if (isObject(val) && isEmpty(val)) lastChild = this.element(key);
						else if (!this.options.keepNullNodes && val == null) lastChild = this.dummy();
						else if (!this.options.separateArrayItems && Array.isArray(val)) for (k = 0, len1 = val.length; k < len1; k++) {
							item = val[k];
							childNode = {};
							childNode[key] = item;
							lastChild = this.element(childNode);
						}
						else if (isObject(val)) {
							if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) lastChild = this.element(val);
							else {
								lastChild = this.element(key);
								lastChild.element(val);
							}
						} else lastChild = this.element(key, val);
					}
					else if (!this.options.keepNullNodes && text === null) lastChild = this.dummy();
					else if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) lastChild = this.text(text);
					else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) lastChild = this.cdata(text);
					else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) lastChild = this.comment(text);
					else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) lastChild = this.raw(text);
					else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
					else lastChild = this.node(name, attributes, text);
					if (lastChild == null) throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
					return lastChild;
				}
				insertBefore(name, attributes, text) {
					var child, i, newChild, refChild, removed;
					if (name != null ? name.type : void 0) {
						newChild = name;
						refChild = attributes;
						newChild.setParent(this);
						if (refChild) {
							i = children.indexOf(refChild);
							removed = children.splice(i);
							children.push(newChild);
							Array.prototype.push.apply(children, removed);
						} else children.push(newChild);
						return newChild;
					} else {
						if (this.isRoot) throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
						i = this.parent.children.indexOf(this);
						removed = this.parent.children.splice(i);
						child = this.parent.element(name, attributes, text);
						Array.prototype.push.apply(this.parent.children, removed);
						return child;
					}
				}
				insertAfter(name, attributes, text) {
					var child, i, removed;
					if (this.isRoot) throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
					i = this.parent.children.indexOf(this);
					removed = this.parent.children.splice(i + 1);
					child = this.parent.element(name, attributes, text);
					Array.prototype.push.apply(this.parent.children, removed);
					return child;
				}
				remove() {
					var i;
					if (this.isRoot) throw new Error("Cannot remove the root element. " + this.debugInfo());
					i = this.parent.children.indexOf(this);
					splice.apply(this.parent.children, [i, i - i + 1].concat([]));
					return this.parent;
				}
				node(name, attributes, text) {
					var child;
					if (name != null) name = getValue(name);
					attributes || (attributes = {});
					attributes = getValue(attributes);
					if (!isObject(attributes)) [text, attributes] = [attributes, text];
					child = new XMLElement(this, name, attributes);
					if (text != null) child.text(text);
					this.children.push(child);
					return child;
				}
				text(value) {
					var child;
					if (isObject(value)) this.element(value);
					child = new XMLText(this, value);
					this.children.push(child);
					return this;
				}
				cdata(value) {
					var child = new XMLCData(this, value);
					this.children.push(child);
					return this;
				}
				comment(value) {
					var child = new XMLComment(this, value);
					this.children.push(child);
					return this;
				}
				commentBefore(value) {
					var i = this.parent.children.indexOf(this), removed = this.parent.children.splice(i);
					this.parent.comment(value);
					Array.prototype.push.apply(this.parent.children, removed);
					return this;
				}
				commentAfter(value) {
					var i = this.parent.children.indexOf(this), removed = this.parent.children.splice(i + 1);
					this.parent.comment(value);
					Array.prototype.push.apply(this.parent.children, removed);
					return this;
				}
				raw(value) {
					var child = new XMLRaw(this, value);
					this.children.push(child);
					return this;
				}
				dummy() {
					return new XMLDummy(this);
				}
				instruction(target, value) {
					var insTarget, insValue, instruction, j, len;
					if (target != null) target = getValue(target);
					if (value != null) value = getValue(value);
					if (Array.isArray(target)) for (j = 0, len = target.length; j < len; j++) {
						insTarget = target[j];
						this.instruction(insTarget);
					}
					else if (isObject(target)) for (insTarget in target) {
						if (!hasProp.call(target, insTarget)) continue;
						insValue = target[insTarget];
						this.instruction(insTarget, insValue);
					}
					else {
						if (isFunction(value)) value = value.apply();
						instruction = new XMLProcessingInstruction(this, target, value);
						this.children.push(instruction);
					}
					return this;
				}
				instructionBefore(target, value) {
					var i = this.parent.children.indexOf(this), removed = this.parent.children.splice(i);
					this.parent.instruction(target, value);
					Array.prototype.push.apply(this.parent.children, removed);
					return this;
				}
				instructionAfter(target, value) {
					var i = this.parent.children.indexOf(this), removed = this.parent.children.splice(i + 1);
					this.parent.instruction(target, value);
					Array.prototype.push.apply(this.parent.children, removed);
					return this;
				}
				declaration(version, encoding, standalone) {
					var doc = this.document(), xmldec = new XMLDeclaration(doc, version, encoding, standalone);
					if (doc.children.length === 0) doc.children.unshift(xmldec);
					else if (doc.children[0].type === NodeType.Declaration) doc.children[0] = xmldec;
					else doc.children.unshift(xmldec);
					return doc.root() || doc;
				}
				dtd(pubID, sysID) {
					var child, doc = this.document(), doctype = new XMLDocType(doc, pubID, sysID), i, j, k, len, len1, ref1 = doc.children, ref2;
					for (i = j = 0, len = ref1.length; j < len; i = ++j) {
						child = ref1[i];
						if (child.type === NodeType.DocType) {
							doc.children[i] = doctype;
							return doctype;
						}
					}
					ref2 = doc.children;
					for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
						child = ref2[i];
						if (child.isRoot) {
							doc.children.splice(i, 0, doctype);
							return doctype;
						}
					}
					doc.children.push(doctype);
					return doctype;
				}
				up() {
					if (this.isRoot) throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
					return this.parent;
				}
				root() {
					var node = this;
					while (node) if (node.type === NodeType.Document) return node.rootObject;
					else if (node.isRoot) return node;
					else node = node.parent;
				}
				document() {
					var node = this;
					while (node) if (node.type === NodeType.Document) return node;
					else node = node.parent;
				}
				end(options) {
					return this.document().end(options);
				}
				prev() {
					var i = this.parent.children.indexOf(this);
					if (i < 1) throw new Error("Already at the first node. " + this.debugInfo());
					return this.parent.children[i - 1];
				}
				next() {
					var i = this.parent.children.indexOf(this);
					if (i === -1 || i === this.parent.children.length - 1) throw new Error("Already at the last node. " + this.debugInfo());
					return this.parent.children[i + 1];
				}
				importDocument(doc) {
					var child, clonedRoot = doc.root().clone(), j, len, ref1;
					clonedRoot.parent = this;
					clonedRoot.isRoot = false;
					this.children.push(clonedRoot);
					if (this.type === NodeType.Document) {
						clonedRoot.isRoot = true;
						clonedRoot.documentObject = this;
						this.rootObject = clonedRoot;
						if (this.children) {
							ref1 = this.children;
							for (j = 0, len = ref1.length; j < len; j++) {
								child = ref1[j];
								if (child.type === NodeType.DocType) {
									child.name = clonedRoot.name;
									break;
								}
							}
						}
					}
					return this;
				}
				debugInfo(name) {
					var ref1, ref2;
					name = name || this.name;
					if (name == null && !((ref1 = this.parent) != null ? ref1.name : void 0)) return "";
					else if (name == null) return "parent: <" + this.parent.name + ">";
					else if (!((ref2 = this.parent) != null ? ref2.name : void 0)) return "node: <" + name + ">";
					else return "node: <" + name + ">, parent: <" + this.parent.name + ">";
				}
				ele(name, attributes, text) {
					return this.element(name, attributes, text);
				}
				nod(name, attributes, text) {
					return this.node(name, attributes, text);
				}
				txt(value) {
					return this.text(value);
				}
				dat(value) {
					return this.cdata(value);
				}
				com(value) {
					return this.comment(value);
				}
				ins(target, value) {
					return this.instruction(target, value);
				}
				doc() {
					return this.document();
				}
				dec(version, encoding, standalone) {
					return this.declaration(version, encoding, standalone);
				}
				e(name, attributes, text) {
					return this.element(name, attributes, text);
				}
				n(name, attributes, text) {
					return this.node(name, attributes, text);
				}
				t(value) {
					return this.text(value);
				}
				d(value) {
					return this.cdata(value);
				}
				c(value) {
					return this.comment(value);
				}
				r(value) {
					return this.raw(value);
				}
				i(target, value) {
					return this.instruction(target, value);
				}
				u() {
					return this.up();
				}
				importXMLBuilder(doc) {
					return this.importDocument(doc);
				}
				attribute(name, value) {
					throw new Error("attribute() applies to element nodes only.");
				}
				att(name, value) {
					return this.attribute(name, value);
				}
				a(name, value) {
					return this.attribute(name, value);
				}
				removeAttribute(name) {
					throw new Error("attribute() applies to element nodes only.");
				}
				replaceChild(newChild, oldChild) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				removeChild(oldChild) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				appendChild(newChild) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				hasChildNodes() {
					return this.children.length !== 0;
				}
				cloneNode(deep) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				normalize() {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				isSupported(feature, version) {
					return true;
				}
				hasAttributes() {
					return this.attribs.length !== 0;
				}
				compareDocumentPosition(other) {
					var ref = this, res;
					if (ref === other) return 0;
					else if (this.document() !== other.document()) {
						res = DocumentPosition.Disconnected | DocumentPosition.ImplementationSpecific;
						if (Math.random() < .5) res |= DocumentPosition.Preceding;
						else res |= DocumentPosition.Following;
						return res;
					} else if (ref.isAncestor(other)) return DocumentPosition.Contains | DocumentPosition.Preceding;
					else if (ref.isDescendant(other)) return DocumentPosition.Contains | DocumentPosition.Following;
					else if (ref.isPreceding(other)) return DocumentPosition.Preceding;
					else return DocumentPosition.Following;
				}
				isSameNode(other) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				lookupPrefix(namespaceURI) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				isDefaultNamespace(namespaceURI) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				lookupNamespaceURI(prefix) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				isEqualNode(node) {
					var i, j, ref1;
					if (node.nodeType !== this.nodeType) return false;
					if (node.children.length !== this.children.length) return false;
					for (i = j = 0, ref1 = this.children.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) if (!this.children[i].isEqualNode(node.children[i])) return false;
					return true;
				}
				getFeature(feature, version) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				setUserData(key, data, handler) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getUserData(key) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				contains(other) {
					if (!other) return false;
					return other === this || this.isDescendant(other);
				}
				isDescendant(node) {
					var child, isDescendantChild, j, len, ref1 = this.children;
					for (j = 0, len = ref1.length; j < len; j++) {
						child = ref1[j];
						if (node === child) return true;
						isDescendantChild = child.isDescendant(node);
						if (isDescendantChild) return true;
					}
					return false;
				}
				isAncestor(node) {
					return node.isDescendant(this);
				}
				isPreceding(node) {
					var nodePos = this.treePosition(node), thisPos = this.treePosition(this);
					if (nodePos === -1 || thisPos === -1) return false;
					else return nodePos < thisPos;
				}
				isFollowing(node) {
					var nodePos = this.treePosition(node), thisPos = this.treePosition(this);
					if (nodePos === -1 || thisPos === -1) return false;
					else return nodePos > thisPos;
				}
				treePosition(node) {
					var found, pos = 0;
					found = false;
					this.foreachTreeNode(this.document(), function(childNode) {
						pos++;
						if (!found && childNode === node) return found = true;
					});
					if (found) return pos;
					else return -1;
				}
				foreachTreeNode(node, func) {
					var child, j, len, ref1, res;
					node || (node = this.document());
					ref1 = node.children;
					for (j = 0, len = ref1.length; j < len; j++) {
						child = ref1[j];
						if (res = func(child)) return res;
						else {
							res = this.foreachTreeNode(child, func);
							if (res) return res;
						}
					}
				}
			}
			Object.defineProperty(XMLNode.prototype, "nodeName", { get: function() {
				return this.name;
			} });
			Object.defineProperty(XMLNode.prototype, "nodeType", { get: function() {
				return this.type;
			} });
			Object.defineProperty(XMLNode.prototype, "nodeValue", { get: function() {
				return this.value;
			} });
			Object.defineProperty(XMLNode.prototype, "parentNode", { get: function() {
				return this.parent;
			} });
			Object.defineProperty(XMLNode.prototype, "childNodes", { get: function() {
				if (!this.childNodeList || !this.childNodeList.nodes) this.childNodeList = new XMLNodeList(this.children);
				return this.childNodeList;
			} });
			Object.defineProperty(XMLNode.prototype, "firstChild", { get: function() {
				return this.children[0] || null;
			} });
			Object.defineProperty(XMLNode.prototype, "lastChild", { get: function() {
				return this.children[this.children.length - 1] || null;
			} });
			Object.defineProperty(XMLNode.prototype, "previousSibling", { get: function() {
				var i = this.parent.children.indexOf(this);
				return this.parent.children[i - 1] || null;
			} });
			Object.defineProperty(XMLNode.prototype, "nextSibling", { get: function() {
				var i = this.parent.children.indexOf(this);
				return this.parent.children[i + 1] || null;
			} });
			Object.defineProperty(XMLNode.prototype, "ownerDocument", { get: function() {
				return this.document() || null;
			} });
			Object.defineProperty(XMLNode.prototype, "textContent", {
				get: function() {
					var child, j, len, ref1, str;
					if (this.nodeType === NodeType.Element || this.nodeType === NodeType.DocumentFragment) {
						str = "";
						ref1 = this.children;
						for (j = 0, len = ref1.length; j < len; j++) {
							child = ref1[j];
							if (child.textContent) str += child.textContent;
						}
						return str;
					} else return null;
				},
				set: function(value) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
			});
			return XMLNode;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLStringifier.js
var require_XMLStringifier = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var hasProp = {}.hasOwnProperty;
		module.exports = (function() {
			class XMLStringifier {
				constructor(options) {
					var key, ref, value;
					this.assertLegalChar = this.assertLegalChar.bind(this);
					this.assertLegalName = this.assertLegalName.bind(this);
					options || (options = {});
					this.options = options;
					if (!this.options.version) this.options.version = "1.0";
					ref = options.stringify || {};
					for (key in ref) {
						if (!hasProp.call(ref, key)) continue;
						value = ref[key];
						this[key] = value;
					}
				}
				name(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalName("" + val || "");
				}
				text(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar(this.textEscape("" + val || ""));
				}
				cdata(val) {
					if (this.options.noValidation) return val;
					val = "" + val || "";
					val = val.replace("]]>", "]]]]><![CDATA[>");
					return this.assertLegalChar(val);
				}
				comment(val) {
					if (this.options.noValidation) return val;
					val = "" + val || "";
					if (val.match(/--/)) throw new Error("Comment text cannot contain double-hypen: " + val);
					return this.assertLegalChar(val);
				}
				raw(val) {
					if (this.options.noValidation) return val;
					return "" + val || "";
				}
				attValue(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar(this.attEscape(val = "" + val || ""));
				}
				insTarget(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar("" + val || "");
				}
				insValue(val) {
					if (this.options.noValidation) return val;
					val = "" + val || "";
					if (val.match(/\?>/)) throw new Error("Invalid processing instruction value: " + val);
					return this.assertLegalChar(val);
				}
				xmlVersion(val) {
					if (this.options.noValidation) return val;
					val = "" + val || "";
					if (!val.match(/1\.[0-9]+/)) throw new Error("Invalid version number: " + val);
					return val;
				}
				xmlEncoding(val) {
					if (this.options.noValidation) return val;
					val = "" + val || "";
					if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) throw new Error("Invalid encoding: " + val);
					return this.assertLegalChar(val);
				}
				xmlStandalone(val) {
					if (this.options.noValidation) return val;
					if (val) return "yes";
					else return "no";
				}
				dtdPubID(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar("" + val || "");
				}
				dtdSysID(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar("" + val || "");
				}
				dtdElementValue(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar("" + val || "");
				}
				dtdAttType(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar("" + val || "");
				}
				dtdAttDefault(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar("" + val || "");
				}
				dtdEntityValue(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar("" + val || "");
				}
				dtdNData(val) {
					if (this.options.noValidation) return val;
					return this.assertLegalChar("" + val || "");
				}
				assertLegalChar(str) {
					var regex, res;
					if (this.options.noValidation) return str;
					if (this.options.version === "1.0") {
						regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g;
						if (this.options.invalidCharReplacement !== void 0) str = str.replace(regex, this.options.invalidCharReplacement);
						else if (res = str.match(regex)) throw new Error(`Invalid character in string: ${str} at index ${res.index}`);
					} else if (this.options.version === "1.1") {
						regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g;
						if (this.options.invalidCharReplacement !== void 0) str = str.replace(regex, this.options.invalidCharReplacement);
						else if (res = str.match(regex)) throw new Error(`Invalid character in string: ${str} at index ${res.index}`);
					}
					return str;
				}
				assertLegalName(str) {
					var regex;
					if (this.options.noValidation) return str;
					str = this.assertLegalChar(str);
					regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
					if (!str.match(regex)) throw new Error(`Invalid character in name: ${str}`);
					return str;
				}
				textEscape(str) {
					var ampregex;
					if (this.options.noValidation) return str;
					ampregex = this.options.noDoubleEncoding ? /(?!&(lt|gt|amp|apos|quot);)&/g : /&/g;
					return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
				}
				attEscape(str) {
					var ampregex;
					if (this.options.noValidation) return str;
					ampregex = this.options.noDoubleEncoding ? /(?!&(lt|gt|amp|apos|quot);)&/g : /&/g;
					return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
				}
			}
			XMLStringifier.prototype.convertAttKey = "@";
			XMLStringifier.prototype.convertPIKey = "?";
			XMLStringifier.prototype.convertTextKey = "#text";
			XMLStringifier.prototype.convertCDataKey = "#cdata";
			XMLStringifier.prototype.convertCommentKey = "#comment";
			XMLStringifier.prototype.convertRawKey = "#raw";
			return XMLStringifier;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/WriterState.js
var require_WriterState = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = {
			None: 0,
			OpenTag: 1,
			InsideTag: 2,
			CloseTag: 3
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLWriterBase.js
var require_XMLWriterBase = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, WriterState, assign, hasProp = {}.hasOwnProperty;
		({assign} = require_Utility());
		NodeType = require_NodeType();
		require_XMLDeclaration();
		require_XMLDocType();
		require_XMLCData();
		require_XMLComment();
		require_XMLElement();
		require_XMLRaw();
		require_XMLText();
		require_XMLProcessingInstruction();
		require_XMLDummy();
		require_XMLDTDAttList();
		require_XMLDTDElement();
		require_XMLDTDEntity();
		require_XMLDTDNotation();
		WriterState = require_WriterState();
		module.exports = class XMLWriterBase {
			constructor(options) {
				var key, ref, value;
				options || (options = {});
				this.options = options;
				ref = options.writer || {};
				for (key in ref) {
					if (!hasProp.call(ref, key)) continue;
					value = ref[key];
					this["_" + key] = this[key];
					this[key] = value;
				}
			}
			filterOptions(options) {
				var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
				options || (options = {});
				options = assign({}, this.options, options);
				filteredOptions = { writer: this };
				filteredOptions.pretty = options.pretty || false;
				filteredOptions.allowEmpty = options.allowEmpty || false;
				filteredOptions.indent = (ref = options.indent) != null ? ref : "  ";
				filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : "\n";
				filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
				filteredOptions.width = (ref3 = options.width) != null ? ref3 : 0;
				filteredOptions.dontPrettyTextNodes = (ref4 = (ref5 = options.dontPrettyTextNodes) != null ? ref5 : options.dontprettytextnodes) != null ? ref4 : 0;
				filteredOptions.spaceBeforeSlash = (ref6 = (ref7 = options.spaceBeforeSlash) != null ? ref7 : options.spacebeforeslash) != null ? ref6 : "";
				if (filteredOptions.spaceBeforeSlash === true) filteredOptions.spaceBeforeSlash = " ";
				filteredOptions.suppressPrettyCount = 0;
				filteredOptions.user = {};
				filteredOptions.state = WriterState.None;
				return filteredOptions;
			}
			indent(node, options, level) {
				var indentLevel;
				if (!options.pretty || options.suppressPrettyCount) return "";
				else if (options.pretty) {
					indentLevel = (level || 0) + options.offset + 1;
					if (indentLevel > 0) return new Array(indentLevel).join(options.indent);
				}
				return "";
			}
			endline(node, options, level) {
				if (!options.pretty || options.suppressPrettyCount) return "";
				else return options.newline;
			}
			attribute(att, options, level) {
				var r;
				this.openAttribute(att, options, level);
				if (options.pretty && options.width > 0) r = att.name + "=\"" + att.value + "\"";
				else r = " " + att.name + "=\"" + att.value + "\"";
				this.closeAttribute(att, options, level);
				return r;
			}
			cdata(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<![CDATA[";
				options.state = WriterState.InsideTag;
				r += node.value;
				options.state = WriterState.CloseTag;
				r += "]]>" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			comment(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!-- ";
				options.state = WriterState.InsideTag;
				r += node.value;
				options.state = WriterState.CloseTag;
				r += " -->" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			declaration(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<?xml";
				options.state = WriterState.InsideTag;
				r += " version=\"" + node.version + "\"";
				if (node.encoding != null) r += " encoding=\"" + node.encoding + "\"";
				if (node.standalone != null) r += " standalone=\"" + node.standalone + "\"";
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + "?>";
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			docType(node, options, level) {
				var child, i, len1, r, ref;
				level || (level = 0);
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level);
				r += "<!DOCTYPE " + node.root().name;
				if (node.pubID && node.sysID) r += " PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"";
				else if (node.sysID) r += " SYSTEM \"" + node.sysID + "\"";
				if (node.children.length > 0) {
					r += " [";
					r += this.endline(node, options, level);
					options.state = WriterState.InsideTag;
					ref = node.children;
					for (i = 0, len1 = ref.length; i < len1; i++) {
						child = ref[i];
						r += this.writeChildNode(child, options, level + 1);
					}
					options.state = WriterState.CloseTag;
					r += "]";
				}
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">";
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			element(node, options, level) {
				var att, attLen, child, childNodeCount, firstChildNode, i, j, len, len1, len2, name, prettySuppressed, r, ratt, ref, ref1, ref2, ref3, rline;
				level || (level = 0);
				prettySuppressed = false;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<" + node.name;
				if (options.pretty && options.width > 0) {
					len = r.length;
					ref = node.attribs;
					for (name in ref) {
						if (!hasProp.call(ref, name)) continue;
						att = ref[name];
						ratt = this.attribute(att, options, level);
						attLen = ratt.length;
						if (len + attLen > options.width) {
							rline = this.indent(node, options, level + 1) + ratt;
							r += this.endline(node, options, level) + rline;
							len = rline.length;
						} else {
							rline = " " + ratt;
							r += rline;
							len += rline.length;
						}
					}
				} else {
					ref1 = node.attribs;
					for (name in ref1) {
						if (!hasProp.call(ref1, name)) continue;
						att = ref1[name];
						r += this.attribute(att, options, level);
					}
				}
				childNodeCount = node.children.length;
				firstChildNode = childNodeCount === 0 ? null : node.children[0];
				if (childNodeCount === 0 || node.children.every(function(e) {
					return (e.type === NodeType.Text || e.type === NodeType.Raw || e.type === NodeType.CData) && e.value === "";
				})) {
					if (options.allowEmpty) {
						r += ">";
						options.state = WriterState.CloseTag;
						r += "</" + node.name + ">" + this.endline(node, options, level);
					} else {
						options.state = WriterState.CloseTag;
						r += options.spaceBeforeSlash + "/>" + this.endline(node, options, level);
					}
				} else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw || firstChildNode.type === NodeType.CData) && firstChildNode.value != null) {
					r += ">";
					options.state = WriterState.InsideTag;
					options.suppressPrettyCount++;
					prettySuppressed = true;
					r += this.writeChildNode(firstChildNode, options, level + 1);
					options.suppressPrettyCount--;
					prettySuppressed = false;
					options.state = WriterState.CloseTag;
					r += "</" + node.name + ">" + this.endline(node, options, level);
				} else {
					if (options.dontPrettyTextNodes) {
						ref2 = node.children;
						for (i = 0, len1 = ref2.length; i < len1; i++) {
							child = ref2[i];
							if ((child.type === NodeType.Text || child.type === NodeType.Raw || child.type === NodeType.CData) && child.value != null) {
								options.suppressPrettyCount++;
								prettySuppressed = true;
								break;
							}
						}
					}
					r += ">" + this.endline(node, options, level);
					options.state = WriterState.InsideTag;
					ref3 = node.children;
					for (j = 0, len2 = ref3.length; j < len2; j++) {
						child = ref3[j];
						r += this.writeChildNode(child, options, level + 1);
					}
					options.state = WriterState.CloseTag;
					r += this.indent(node, options, level) + "</" + node.name + ">";
					if (prettySuppressed) options.suppressPrettyCount--;
					r += this.endline(node, options, level);
					options.state = WriterState.None;
				}
				this.closeNode(node, options, level);
				return r;
			}
			writeChildNode(node, options, level) {
				switch (node.type) {
					case NodeType.CData: return this.cdata(node, options, level);
					case NodeType.Comment: return this.comment(node, options, level);
					case NodeType.Element: return this.element(node, options, level);
					case NodeType.Raw: return this.raw(node, options, level);
					case NodeType.Text: return this.text(node, options, level);
					case NodeType.ProcessingInstruction: return this.processingInstruction(node, options, level);
					case NodeType.Dummy: return "";
					case NodeType.Declaration: return this.declaration(node, options, level);
					case NodeType.DocType: return this.docType(node, options, level);
					case NodeType.AttributeDeclaration: return this.dtdAttList(node, options, level);
					case NodeType.ElementDeclaration: return this.dtdElement(node, options, level);
					case NodeType.EntityDeclaration: return this.dtdEntity(node, options, level);
					case NodeType.NotationDeclaration: return this.dtdNotation(node, options, level);
					default: throw new Error("Unknown XML node type: " + node.constructor.name);
				}
			}
			processingInstruction(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<?";
				options.state = WriterState.InsideTag;
				r += node.target;
				if (node.value) r += " " + node.value;
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + "?>";
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			raw(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level);
				options.state = WriterState.InsideTag;
				r += node.value;
				options.state = WriterState.CloseTag;
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			text(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level);
				options.state = WriterState.InsideTag;
				r += node.value;
				options.state = WriterState.CloseTag;
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			dtdAttList(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!ATTLIST";
				options.state = WriterState.InsideTag;
				r += " " + node.elementName + " " + node.attributeName + " " + node.attributeType;
				if (node.defaultValueType !== "#DEFAULT") r += " " + node.defaultValueType;
				if (node.defaultValue) r += " \"" + node.defaultValue + "\"";
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			dtdElement(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!ELEMENT";
				options.state = WriterState.InsideTag;
				r += " " + node.name + " " + node.value;
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			dtdEntity(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!ENTITY";
				options.state = WriterState.InsideTag;
				if (node.pe) r += " %";
				r += " " + node.name;
				if (node.value) r += " \"" + node.value + "\"";
				else {
					if (node.pubID && node.sysID) r += " PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"";
					else if (node.sysID) r += " SYSTEM \"" + node.sysID + "\"";
					if (node.nData) r += " NDATA " + node.nData;
				}
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			dtdNotation(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!NOTATION";
				options.state = WriterState.InsideTag;
				r += " " + node.name;
				if (node.pubID && node.sysID) r += " PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"";
				else if (node.pubID) r += " PUBLIC \"" + node.pubID + "\"";
				else if (node.sysID) r += " SYSTEM \"" + node.sysID + "\"";
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			}
			openNode(node, options, level) {}
			closeNode(node, options, level) {}
			openAttribute(att, options, level) {}
			closeAttribute(att, options, level) {}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLStringWriter.js
var require_XMLStringWriter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var XMLWriterBase = require_XMLWriterBase();
		module.exports = class XMLStringWriter extends XMLWriterBase {
			constructor(options) {
				super(options);
			}
			document(doc, options) {
				var child, i, len, r, ref;
				options = this.filterOptions(options);
				r = "";
				ref = doc.children;
				for (i = 0, len = ref.length; i < len; i++) {
					child = ref[i];
					r += this.writeChildNode(child, options, 0);
				}
				if (options.pretty && r.slice(-options.newline.length) === options.newline) r = r.slice(0, -options.newline.length);
				return r;
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDocument.js
var require_XMLDocument = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLDOMConfiguration, XMLDOMImplementation, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject;
		({isPlainObject} = require_Utility());
		XMLDOMImplementation = require_XMLDOMImplementation();
		XMLDOMConfiguration = require_XMLDOMConfiguration();
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		XMLStringifier = require_XMLStringifier();
		XMLStringWriter = require_XMLStringWriter();
		module.exports = (function() {
			class XMLDocument extends XMLNode {
				constructor(options) {
					super(null);
					this.name = "#document";
					this.type = NodeType.Document;
					this.documentURI = null;
					this.domConfig = new XMLDOMConfiguration();
					options || (options = {});
					if (!options.writer) options.writer = new XMLStringWriter();
					this.options = options;
					this.stringify = new XMLStringifier(options);
				}
				end(writer) {
					var writerOptions = {};
					if (!writer) writer = this.options.writer;
					else if (isPlainObject(writer)) {
						writerOptions = writer;
						writer = this.options.writer;
					}
					return writer.document(this, writer.filterOptions(writerOptions));
				}
				toString(options) {
					return this.options.writer.document(this, this.options.writer.filterOptions(options));
				}
				createElement(tagName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createDocumentFragment() {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createTextNode(data) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createComment(data) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createCDATASection(data) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createProcessingInstruction(target, data) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createAttribute(name) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createEntityReference(name) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getElementsByTagName(tagname) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				importNode(importedNode, deep) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createElementNS(namespaceURI, qualifiedName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createAttributeNS(namespaceURI, qualifiedName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getElementsByTagNameNS(namespaceURI, localName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getElementById(elementId) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				adoptNode(source) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				normalizeDocument() {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				renameNode(node, namespaceURI, qualifiedName) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				getElementsByClassName(classNames) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createEvent(eventInterface) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createRange() {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createNodeIterator(root, whatToShow, filter) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
				createTreeWalker(root, whatToShow, filter) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
			}
			Object.defineProperty(XMLDocument.prototype, "implementation", { value: new XMLDOMImplementation() });
			Object.defineProperty(XMLDocument.prototype, "doctype", { get: function() {
				var child, i, len, ref = this.children;
				for (i = 0, len = ref.length; i < len; i++) {
					child = ref[i];
					if (child.type === NodeType.DocType) return child;
				}
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "documentElement", { get: function() {
				return this.rootObject || null;
			} });
			Object.defineProperty(XMLDocument.prototype, "inputEncoding", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "strictErrorChecking", { get: function() {
				return false;
			} });
			Object.defineProperty(XMLDocument.prototype, "xmlEncoding", { get: function() {
				if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) return this.children[0].encoding;
				else return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "xmlStandalone", { get: function() {
				if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) return this.children[0].standalone === "yes";
				else return false;
			} });
			Object.defineProperty(XMLDocument.prototype, "xmlVersion", { get: function() {
				if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) return this.children[0].version;
				else return "1.0";
			} });
			Object.defineProperty(XMLDocument.prototype, "URL", { get: function() {
				return this.documentURI;
			} });
			Object.defineProperty(XMLDocument.prototype, "origin", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "compatMode", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "characterSet", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "contentType", { get: function() {
				return null;
			} });
			return XMLDocument;
		}).call(this);
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLDocumentCB.js
var require_XMLDocumentCB = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, WriterState, XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocument, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, getValue, isFunction, isObject, isPlainObject, hasProp = {}.hasOwnProperty;
		({isObject, isFunction, isPlainObject, getValue} = require_Utility());
		NodeType = require_NodeType();
		XMLDocument = require_XMLDocument();
		XMLElement = require_XMLElement();
		XMLCData = require_XMLCData();
		XMLComment = require_XMLComment();
		XMLRaw = require_XMLRaw();
		XMLText = require_XMLText();
		XMLProcessingInstruction = require_XMLProcessingInstruction();
		XMLDeclaration = require_XMLDeclaration();
		XMLDocType = require_XMLDocType();
		XMLDTDAttList = require_XMLDTDAttList();
		XMLDTDEntity = require_XMLDTDEntity();
		XMLDTDElement = require_XMLDTDElement();
		XMLDTDNotation = require_XMLDTDNotation();
		XMLAttribute = require_XMLAttribute();
		XMLStringifier = require_XMLStringifier();
		XMLStringWriter = require_XMLStringWriter();
		WriterState = require_WriterState();
		module.exports = class XMLDocumentCB {
			constructor(options, onData, onEnd) {
				var writerOptions;
				this.name = "?xml";
				this.type = NodeType.Document;
				options || (options = {});
				writerOptions = {};
				if (!options.writer) options.writer = new XMLStringWriter();
				else if (isPlainObject(options.writer)) {
					writerOptions = options.writer;
					options.writer = new XMLStringWriter();
				}
				this.options = options;
				this.writer = options.writer;
				this.writerOptions = this.writer.filterOptions(writerOptions);
				this.stringify = new XMLStringifier(options);
				this.onDataCallback = onData || function() {};
				this.onEndCallback = onEnd || function() {};
				this.currentNode = null;
				this.currentLevel = -1;
				this.openTags = {};
				this.documentStarted = false;
				this.documentCompleted = false;
				this.root = null;
			}
			createChildNode(node) {
				var att, attName, attributes, child, i, len, ref, ref1;
				switch (node.type) {
					case NodeType.CData:
						this.cdata(node.value);
						break;
					case NodeType.Comment:
						this.comment(node.value);
						break;
					case NodeType.Element:
						attributes = {};
						ref = node.attribs;
						for (attName in ref) {
							if (!hasProp.call(ref, attName)) continue;
							att = ref[attName];
							attributes[attName] = att.value;
						}
						this.node(node.name, attributes);
						break;
					case NodeType.Dummy:
						this.dummy();
						break;
					case NodeType.Raw:
						this.raw(node.value);
						break;
					case NodeType.Text:
						this.text(node.value);
						break;
					case NodeType.ProcessingInstruction:
						this.instruction(node.target, node.value);
						break;
					default: throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
				}
				ref1 = node.children;
				for (i = 0, len = ref1.length; i < len; i++) {
					child = ref1[i];
					this.createChildNode(child);
					if (child.type === NodeType.Element) this.up();
				}
				return this;
			}
			dummy() {
				return this;
			}
			node(name, attributes, text) {
				if (name == null) throw new Error("Missing node name.");
				if (this.root && this.currentLevel === -1) throw new Error("Document can only have one root node. " + this.debugInfo(name));
				this.openCurrent();
				name = getValue(name);
				if (attributes == null) attributes = {};
				attributes = getValue(attributes);
				if (!isObject(attributes)) [text, attributes] = [attributes, text];
				this.currentNode = new XMLElement(this, name, attributes);
				this.currentNode.children = false;
				this.currentLevel++;
				this.openTags[this.currentLevel] = this.currentNode;
				if (text != null) this.text(text);
				return this;
			}
			element(name, attributes, text) {
				var child, i, len, oldValidationFlag, ref, root;
				if (this.currentNode && this.currentNode.type === NodeType.DocType) this.dtdElement(...arguments);
				else if (Array.isArray(name) || isObject(name) || isFunction(name)) {
					oldValidationFlag = this.options.noValidation;
					this.options.noValidation = true;
					root = new XMLDocument(this.options).element("TEMP_ROOT");
					root.element(name);
					this.options.noValidation = oldValidationFlag;
					ref = root.children;
					for (i = 0, len = ref.length; i < len; i++) {
						child = ref[i];
						this.createChildNode(child);
						if (child.type === NodeType.Element) this.up();
					}
				} else this.node(name, attributes, text);
				return this;
			}
			attribute(name, value) {
				var attName, attValue;
				if (!this.currentNode || this.currentNode.children) throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
				if (name != null) name = getValue(name);
				if (isObject(name)) for (attName in name) {
					if (!hasProp.call(name, attName)) continue;
					attValue = name[attName];
					this.attribute(attName, attValue);
				}
				else {
					if (isFunction(value)) value = value.apply();
					if (this.options.keepNullAttributes && value == null) this.currentNode.attribs[name] = new XMLAttribute(this, name, "");
					else if (value != null) this.currentNode.attribs[name] = new XMLAttribute(this, name, value);
				}
				return this;
			}
			text(value) {
				var node;
				this.openCurrent();
				node = new XMLText(this, value);
				this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			cdata(value) {
				var node;
				this.openCurrent();
				node = new XMLCData(this, value);
				this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			comment(value) {
				var node;
				this.openCurrent();
				node = new XMLComment(this, value);
				this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			raw(value) {
				var node;
				this.openCurrent();
				node = new XMLRaw(this, value);
				this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			instruction(target, value) {
				var i, insTarget, insValue, len, node;
				this.openCurrent();
				if (target != null) target = getValue(target);
				if (value != null) value = getValue(value);
				if (Array.isArray(target)) for (i = 0, len = target.length; i < len; i++) {
					insTarget = target[i];
					this.instruction(insTarget);
				}
				else if (isObject(target)) for (insTarget in target) {
					if (!hasProp.call(target, insTarget)) continue;
					insValue = target[insTarget];
					this.instruction(insTarget, insValue);
				}
				else {
					if (isFunction(value)) value = value.apply();
					node = new XMLProcessingInstruction(this, target, value);
					this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				}
				return this;
			}
			declaration(version, encoding, standalone) {
				var node;
				this.openCurrent();
				if (this.documentStarted) throw new Error("declaration() must be the first node.");
				node = new XMLDeclaration(this, version, encoding, standalone);
				this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			doctype(root, pubID, sysID) {
				this.openCurrent();
				if (root == null) throw new Error("Missing root node name.");
				if (this.root) throw new Error("dtd() must come before the root node.");
				this.currentNode = new XMLDocType(this, pubID, sysID);
				this.currentNode.rootNodeName = root;
				this.currentNode.children = false;
				this.currentLevel++;
				this.openTags[this.currentLevel] = this.currentNode;
				return this;
			}
			dtdElement(name, value) {
				var node;
				this.openCurrent();
				node = new XMLDTDElement(this, name, value);
				this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			attList(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
				var node;
				this.openCurrent();
				node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
				this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			entity(name, value) {
				var node;
				this.openCurrent();
				node = new XMLDTDEntity(this, false, name, value);
				this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			pEntity(name, value) {
				var node;
				this.openCurrent();
				node = new XMLDTDEntity(this, true, name, value);
				this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			notation(name, value) {
				var node;
				this.openCurrent();
				node = new XMLDTDNotation(this, name, value);
				this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			}
			up() {
				if (this.currentLevel < 0) throw new Error("The document node has no parent.");
				if (this.currentNode) {
					if (this.currentNode.children) this.closeNode(this.currentNode);
					else this.openNode(this.currentNode);
					this.currentNode = null;
				} else this.closeNode(this.openTags[this.currentLevel]);
				delete this.openTags[this.currentLevel];
				this.currentLevel--;
				return this;
			}
			end() {
				while (this.currentLevel >= 0) this.up();
				return this.onEnd();
			}
			openCurrent() {
				if (this.currentNode) {
					this.currentNode.children = true;
					return this.openNode(this.currentNode);
				}
			}
			openNode(node) {
				var att, chunk, name, ref;
				if (!node.isOpen) {
					if (!this.root && this.currentLevel === 0 && node.type === NodeType.Element) this.root = node;
					chunk = "";
					if (node.type === NodeType.Element) {
						this.writerOptions.state = WriterState.OpenTag;
						chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<" + node.name;
						ref = node.attribs;
						for (name in ref) {
							if (!hasProp.call(ref, name)) continue;
							att = ref[name];
							chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
						}
						chunk += (node.children ? ">" : "/>") + this.writer.endline(node, this.writerOptions, this.currentLevel);
						this.writerOptions.state = WriterState.InsideTag;
					} else {
						this.writerOptions.state = WriterState.OpenTag;
						chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<!DOCTYPE " + node.rootNodeName;
						if (node.pubID && node.sysID) chunk += " PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"";
						else if (node.sysID) chunk += " SYSTEM \"" + node.sysID + "\"";
						if (node.children) {
							chunk += " [";
							this.writerOptions.state = WriterState.InsideTag;
						} else {
							this.writerOptions.state = WriterState.CloseTag;
							chunk += ">";
						}
						chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
					}
					this.onData(chunk, this.currentLevel);
					return node.isOpen = true;
				}
			}
			closeNode(node) {
				var chunk;
				if (!node.isClosed) {
					chunk = "";
					this.writerOptions.state = WriterState.CloseTag;
					if (node.type === NodeType.Element) chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "</" + node.name + ">" + this.writer.endline(node, this.writerOptions, this.currentLevel);
					else chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "]>" + this.writer.endline(node, this.writerOptions, this.currentLevel);
					this.writerOptions.state = WriterState.None;
					this.onData(chunk, this.currentLevel);
					return node.isClosed = true;
				}
			}
			onData(chunk, level) {
				this.documentStarted = true;
				return this.onDataCallback(chunk, level + 1);
			}
			onEnd() {
				this.documentCompleted = true;
				return this.onEndCallback();
			}
			debugInfo(name) {
				if (name == null) return "";
				else return "node: <" + name + ">";
			}
			ele() {
				return this.element(...arguments);
			}
			nod(name, attributes, text) {
				return this.node(name, attributes, text);
			}
			txt(value) {
				return this.text(value);
			}
			dat(value) {
				return this.cdata(value);
			}
			com(value) {
				return this.comment(value);
			}
			ins(target, value) {
				return this.instruction(target, value);
			}
			dec(version, encoding, standalone) {
				return this.declaration(version, encoding, standalone);
			}
			dtd(root, pubID, sysID) {
				return this.doctype(root, pubID, sysID);
			}
			e(name, attributes, text) {
				return this.element(name, attributes, text);
			}
			n(name, attributes, text) {
				return this.node(name, attributes, text);
			}
			t(value) {
				return this.text(value);
			}
			d(value) {
				return this.cdata(value);
			}
			c(value) {
				return this.comment(value);
			}
			r(value) {
				return this.raw(value);
			}
			i(target, value) {
				return this.instruction(target, value);
			}
			att() {
				if (this.currentNode && this.currentNode.type === NodeType.DocType) return this.attList(...arguments);
				else return this.attribute(...arguments);
			}
			a() {
				if (this.currentNode && this.currentNode.type === NodeType.DocType) return this.attList(...arguments);
				else return this.attribute(...arguments);
			}
			ent(name, value) {
				return this.entity(name, value);
			}
			pent(name, value) {
				return this.pEntity(name, value);
			}
			not(name, value) {
				return this.notation(name, value);
			}
		};
	}).call(exports);
}));
//#endregion
//#region node_modules/xmlbuilder/lib/XMLStreamWriter.js
var require_XMLStreamWriter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, WriterState, XMLWriterBase, hasProp = {}.hasOwnProperty;
		NodeType = require_NodeType();
		XMLWriterBase = require_XMLWriterBase();
		WriterState = require_WriterState();
		module.exports = class XMLStreamWriter extends XMLWriterBase {
			constructor(stream, options) {
				super(options);
				this.stream = stream;
			}
			endline(node, options, level) {
				if (node.isLastRootNode && options.state === WriterState.CloseTag) return "";
				else return super.endline(node, options, level);
			}
			document(doc, options) {
				var child, i, j, k, len1, len2, ref = doc.children, ref1, results;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					child = ref[i];
					child.isLastRootNode = i === doc.children.length - 1;
				}
				options = this.filterOptions(options);
				ref1 = doc.children;
				results = [];
				for (k = 0, len2 = ref1.length; k < len2; k++) {
					child = ref1[k];
					results.push(this.writeChildNode(child, options, 0));
				}
				return results;
			}
			cdata(node, options, level) {
				return this.stream.write(super.cdata(node, options, level));
			}
			comment(node, options, level) {
				return this.stream.write(super.comment(node, options, level));
			}
			declaration(node, options, level) {
				return this.stream.write(super.declaration(node, options, level));
			}
			docType(node, options, level) {
				var child, j, len1, ref;
				level || (level = 0);
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				this.stream.write(this.indent(node, options, level));
				this.stream.write("<!DOCTYPE " + node.root().name);
				if (node.pubID && node.sysID) this.stream.write(" PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"");
				else if (node.sysID) this.stream.write(" SYSTEM \"" + node.sysID + "\"");
				if (node.children.length > 0) {
					this.stream.write(" [");
					this.stream.write(this.endline(node, options, level));
					options.state = WriterState.InsideTag;
					ref = node.children;
					for (j = 0, len1 = ref.length; j < len1; j++) {
						child = ref[j];
						this.writeChildNode(child, options, level + 1);
					}
					options.state = WriterState.CloseTag;
					this.stream.write("]");
				}
				options.state = WriterState.CloseTag;
				this.stream.write(options.spaceBeforeSlash + ">");
				this.stream.write(this.endline(node, options, level));
				options.state = WriterState.None;
				return this.closeNode(node, options, level);
			}
			element(node, options, level) {
				var att, attLen, child, childNodeCount, firstChildNode, j, len, len1, name, r, ratt, ref, ref1, ref2, rline;
				level || (level = 0);
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<" + node.name;
				if (options.pretty && options.width > 0) {
					len = r.length;
					ref = node.attribs;
					for (name in ref) {
						if (!hasProp.call(ref, name)) continue;
						att = ref[name];
						ratt = this.attribute(att, options, level);
						attLen = ratt.length;
						if (len + attLen > options.width) {
							rline = this.indent(node, options, level + 1) + ratt;
							r += this.endline(node, options, level) + rline;
							len = rline.length;
						} else {
							rline = " " + ratt;
							r += rline;
							len += rline.length;
						}
					}
				} else {
					ref1 = node.attribs;
					for (name in ref1) {
						if (!hasProp.call(ref1, name)) continue;
						att = ref1[name];
						r += this.attribute(att, options, level);
					}
				}
				this.stream.write(r);
				childNodeCount = node.children.length;
				firstChildNode = childNodeCount === 0 ? null : node.children[0];
				if (childNodeCount === 0 || node.children.every(function(e) {
					return (e.type === NodeType.Text || e.type === NodeType.Raw || e.type === NodeType.CData) && e.value === "";
				})) {
					if (options.allowEmpty) {
						this.stream.write(">");
						options.state = WriterState.CloseTag;
						this.stream.write("</" + node.name + ">");
					} else {
						options.state = WriterState.CloseTag;
						this.stream.write(options.spaceBeforeSlash + "/>");
					}
				} else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw || firstChildNode.type === NodeType.CData) && firstChildNode.value != null) {
					this.stream.write(">");
					options.state = WriterState.InsideTag;
					options.suppressPrettyCount++;
					this.writeChildNode(firstChildNode, options, level + 1);
					options.suppressPrettyCount--;
					options.state = WriterState.CloseTag;
					this.stream.write("</" + node.name + ">");
				} else {
					this.stream.write(">" + this.endline(node, options, level));
					options.state = WriterState.InsideTag;
					ref2 = node.children;
					for (j = 0, len1 = ref2.length; j < len1; j++) {
						child = ref2[j];
						this.writeChildNode(child, options, level + 1);
					}
					options.state = WriterState.CloseTag;
					this.stream.write(this.indent(node, options, level) + "</" + node.name + ">");
				}
				this.stream.write(this.endline(node, options, level));
				options.state = WriterState.None;
				return this.closeNode(node, options, level);
			}
			processingInstruction(node, options, level) {
				return this.stream.write(super.processingInstruction(node, options, level));
			}
			raw(node, options, level) {
				return this.stream.write(super.raw(node, options, level));
			}
			text(node, options, level) {
				return this.stream.write(super.text(node, options, level));
			}
			dtdAttList(node, options, level) {
				return this.stream.write(super.dtdAttList(node, options, level));
			}
			dtdElement(node, options, level) {
				return this.stream.write(super.dtdElement(node, options, level));
			}
			dtdEntity(node, options, level) {
				return this.stream.write(super.dtdEntity(node, options, level));
			}
			dtdNotation(node, options, level) {
				return this.stream.write(super.dtdNotation(node, options, level));
			}
		};
	}).call(exports);
}));
//#endregion
//#region ../../helper/classcon-documentreader/autoRouting.ts
var import_lib = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, WriterState, XMLDOMImplementation, XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction;
		({assign, isFunction} = require_Utility());
		XMLDOMImplementation = require_XMLDOMImplementation();
		XMLDocument = require_XMLDocument();
		XMLDocumentCB = require_XMLDocumentCB();
		XMLStringWriter = require_XMLStringWriter();
		XMLStreamWriter = require_XMLStreamWriter();
		NodeType = require_NodeType();
		WriterState = require_WriterState();
		module.exports.create = function(name, xmldec, doctype, options) {
			var doc, root;
			if (name == null) throw new Error("Root element needs a name.");
			options = assign({}, xmldec, doctype, options);
			doc = new XMLDocument(options);
			root = doc.element(name);
			if (!options.headless) {
				doc.declaration(options);
				if (options.pubID != null || options.sysID != null) doc.dtd(options);
			}
			return root;
		};
		module.exports.begin = function(options, onData, onEnd) {
			if (isFunction(options)) {
				[onData, onEnd] = [options, onData];
				options = {};
			}
			if (onData) return new XMLDocumentCB(options, onData, onEnd);
			else return new XMLDocument(options);
		};
		module.exports.stringWriter = function(options) {
			return new XMLStringWriter(options);
		};
		module.exports.streamWriter = function(stream, options) {
			return new XMLStreamWriter(stream, options);
		};
		module.exports.implementation = new XMLDOMImplementation();
		module.exports.nodeType = NodeType;
		module.exports.writerState = WriterState;
	}).call(exports);
})))();
/**
* Betrag aus dem Rechnungsleser bzw. der Eingabe: "1.234,56", "1234.56",
* "1 234,56 EUR". Das letzte Komma/der letzte Punkt mit 1-2 Nachkommastellen
* gilt als Dezimaltrenner. NaN = kein Betrag.
*/
function parseAmount(text) {
	const cleaned = text.replace(/[^\d,.\-]/g, "");
	if (!/\d/.test(cleaned)) return NaN;
	const match = /^(.*)[.,](\d{1,2})$/.exec(cleaned);
	const normalized = match ? `${match[1].replace(/[.,]/g, "")}.${match[2]}` : cleaned.replace(/[.,]/g, "");
	return Number(normalized);
}
//#endregion
//#region ../../helper/utils/logger.ts
var LogLevel = /* @__PURE__ */ function(LogLevel) {
	LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
	LogLevel[LogLevel["INFO"] = 1] = "INFO";
	LogLevel[LogLevel["WARN"] = 2] = "WARN";
	LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
	return LogLevel;
}({});
var Logger = class {
	level;
	showTimestamp;
	constructor(options = {}) {
		this.level = options.level ?? LogLevel.INFO;
		this.showTimestamp = options.showTimestamp ?? true;
	}
	formatMessage(level, message) {
		const paddedLevel = level.toUpperCase().padEnd(5, " ");
		return `${this.showTimestamp ? `[${(/* @__PURE__ */ new Date()).toISOString()}] ` : ""}${paddedLevel}: ${message}`;
	}
	debug(message, ...args) {
		if (this.level <= LogLevel.DEBUG) console.debug(this.formatMessage("debug", message), ...args);
	}
	info(message, ...args) {
		if (this.level <= LogLevel.INFO) console.info(this.formatMessage("info", message), ...args);
	}
	warn(message, ...args) {
		if (this.level <= LogLevel.WARN) console.warn(this.formatMessage("warn", message), ...args);
	}
	error(message, ...args) {
		if (this.level <= LogLevel.ERROR) console.error(this.formatMessage("error", message), ...args);
	}
	setLevel(newLevel) {
		this.level = newLevel;
	}
};
var loggerInstance;
function initLogger(level = LogLevel.INFO, showTimestamp = true) {
	if (!loggerInstance) loggerInstance = new Logger({
		level,
		showTimestamp
	});
	return loggerInstance;
}
//#endregion
//#region src/scripts/lib/preExportHandler.ts
var logger = initLogger(LogLevel.INFO);
var DOCUMENT_TYPE_FIELD = "DocumentType";
var MAPPING = {
	Invoice: "2",
	CreditAdvice: "3",
	CorrectionOfInvoice: "2"
};
var KNOWN_CODES = /* @__PURE__ */ new Set(["2", "3"]);
/**
* Handler für den Extension Point: setzt DocumentType auf den ERP-Code und
* ruft danach optional extend auf. extend bekommt den DocumentType von vor der
* Umsetzung, weil z.B. die Rechnungskorrektur am Code nicht mehr erkennbar ist.
*/
function preExportHandler(extend) {
	return async (req, res) => {
		try {
			const body = parseBody(req);
			const documentType = String(body[DOCUMENT_TYPE_FIELD] ?? "");
			const mapped = MAPPING[documentType];
			if (mapped) body[DOCUMENT_TYPE_FIELD] = mapped;
			else if (!KNOWN_CODES.has(documentType)) body[DOCUMENT_TYPE_FIELD] = "2";
			logger.info(`DocumentType "${documentType}" -> "${body[DOCUMENT_TYPE_FIELD]}".`);
			extend?.(req, body, documentType);
			res.status(200).set("Content-Type", "application/json").send(JSON.stringify(body));
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			logger.error(`Fehler: ${message}`);
			res.status(500).set("Content-Type", "application/json").send(JSON.stringify({ error: message }));
		}
	};
}
function parseBody(req) {
	try {
		const body = req.json?.();
		return body && typeof body === "object" ? body : {};
	} catch {
		return {};
	}
}
//#endregion
//#region src/scripts/preExportGevisR.ts
/**
* "Rechnungsleser: PreExport" für gevis R-Linie: wird statt preExport.ts
* ausgerollt (das Onboarding-Formular wählt den Code nach dem ERP-Zielsystem).
* Macht dasselbe wie preExport.ts und erzeugt zusätzlich das Export-XML
* (GEVISEKDTA) im Attribut "exportXML" - das SFTP-Zielsystem schreibt es als
* Datei auf den Server (siehe SFTP_EXPORT_MAPPING in src/forms/steps.ts).
*
* customerVariables: gwsNo (GWS-Nr. aus der Konfiguration des Formulars).
* Fehlt sie, schlägt der Export fehl, statt ein falsches XML zu liefern.
*/
var SENDER_CODE = "4399901227088";
var RECEIVER_CODE = "4399901723740";
var EXPORT_FIELD = "exportXML";
var DOCUMENT_TYPE_LABELS = {
	Invoice: "Rechnung",
	CreditAdvice: "Gutschrift",
	CorrectionOfInvoice: "Rechnungskorrektur",
	"2": "Rechnung",
	"3": "Gutschrift"
};
module.exports = preExportHandler((req, body, originalDocumentType) => {
	const gwsNo = text(req.var("gwsNo"));
	if (!gwsNo) throw new Error("customerVariable \"gwsNo\" fehlt - bitte im Onboarding die GWS-Nr. eintragen und das Skript aktualisieren.");
	body[EXPORT_FIELD] = buildExportXml(body, gwsNo, DOCUMENT_TYPE_LABELS[originalDocumentType] ?? "Rechnung");
});
function buildExportXml(body, gwsNo, documentTypeLabel) {
	const root = (0, import_lib.create)("GEVISEKDTA", {
		version: "1.0",
		encoding: "UTF-8"
	});
	const header = root.ele("DSW345").ele("Header");
	header.ele("Sendercode", SENDER_CODE);
	header.ele("Empfaengercode", RECEIVER_CODE);
	header.ele("Erstellungsdatum", "");
	header.ele("Erstellungszeit", "");
	header.ele("DocumentType", text(body.DocumentType));
	header.ele("Datenaustauschreferenz", "");
	const lines = vatLines(body);
	const gross = text(body.GrossAmount);
	const net = total(lines.map((line) => line.net), text(body.NetAmount1));
	const vat = total(lines.map((line) => line.vat), text(body.VatAmount1));
	const invoiceDate = formatDate(new Date(text(body.InvoiceDate)));
	const head = header.ele("Kopfdaten");
	head.ele("Belegart", documentTypeLabel);
	head.ele("GWSNummer", gwsNo);
	head.ele("Rechnungstyp", text(body.Rechnungstyp));
	head.ele("Nr", text(body.InvoiceNumber));
	head.ele("Lagerortcode", "");
	head.ele("Eink-von-Kred-Nr", text(body.VENDOR_NUM));
	head.ele("Eink-von-Kred-Name", text(body.VENDOR_NAME));
	head.ele("Mandant", text(body.NAME));
	head.ele("Belegdatum", invoiceDate);
	head.ele("Faelligkeitsdatum", "");
	head.ele("Scandatum", formatDate(/* @__PURE__ */ new Date()));
	head.ele("Buchungsdatum", invoiceDate);
	head.ele("Listennummer");
	head.ele("Betrag", net);
	head.ele("Betrag-inkl-Mwst", gross);
	head.ele("Zahlbetrag-inkl-Mwst", gross);
	head.ele("Mwst", vat);
	head.ele("DokumentenNr", text(body.Barcode));
	head.ele("Streckescan", "");
	head.ele("Ihre-Referenz", "");
	head.ele("Zlg-Bedingungscode", "");
	head.ele("Zahlungsformcode", "");
	head.ele("Lieferdatum", "");
	head.ele("FibuVorlage", "");
	let lineNumber = 0;
	const addSum = (description, qualifier, kind, amount, share, taxRate) => {
		const sum = head.ele("Kopfsummen");
		sum.ele("Zeilennr", String(++lineNumber));
		sum.ele("Beschreibung", description);
		sum.ele("Qualifier", qualifier);
		sum.ele("Summenart", kind);
		sum.ele("Betrag", amount);
		sum.ele("Rechnungsanteil", share);
		sum.ele("Anzahl-Positionen", "1");
		sum.ele("Steuerwert", taxRate);
	};
	addSum("Nettogesamt", "125", "BELEGSUMME", net, net, "0");
	addSum("GesamtMWST", "124", "BELEGSUMME", vat, vat, "0");
	addSum("Nettozeile", "79", "BELEGSUMME", net, net, "0");
	addSum("Bruttogesamt", "77", "BELEGSUMME", gross, gross, "0");
	for (const line of lines) {
		const rate = formatRate(line.rate);
		addSum(`MWST${rate}`, "124", "STEUERSUMME", line.vat, line.net, rate);
		addSum(`MWST${rate}Zeile`, "79", "STEUERSUMME", line.net, line.net, rate);
	}
	addSum("Frachtkosten", "64", "BELEGSUMME", "", "", "0");
	addSum("Skontobemessung", "129", "BELEGSUMME", gross, gross, "0");
	orderNumbers(body.OrderNum).forEach((orderNumber, index) => addOrderReference(head, orderNumber, index + 1));
	return root.toString();
}
function addOrderReference(head, orderNumber, lineNumber) {
	const reference = head.ele("Kopfreferenzen");
	reference.ele("Zeilennr", String(lineNumber));
	reference.ele("Qualifier", "ON");
	reference.ele("Referenznummer", orderNumber);
	reference.ele("Beschreibung", "Bestellnummer");
}
function vatLines(body) {
	return [
		1,
		2,
		3
	].map((index) => ({
		rate: text(body[`VatRate${index}`]),
		net: text(body[`NetAmount${index}`]),
		vat: text(body[`VatAmount${index}`])
	})).filter((line) => hasAmount(line.net) || hasAmount(line.vat));
}
function hasAmount(value) {
	const amount = parseAmount(value);
	return Number.isFinite(amount) && amount !== 0;
}
function total(values, fallback) {
	if (values.length === 0) return fallback;
	if (values.length === 1) return values[0];
	const sum = values.map(parseAmount).filter(Number.isFinite).reduce((a, b) => a + b, 0).toFixed(2);
	return values.some((value) => value.includes(",")) ? sum.replace(".", ",") : sum;
}
function formatRate(rate) {
	const value = parseAmount(rate);
	return (Number.isFinite(value) ? value : 0).toFixed(2).replace(".", ",");
}
function orderNumbers(value) {
	return (Array.isArray(value) ? value.join(";") : text(value)).split(";").map((orderNumber) => orderNumber.trim()).filter(Boolean);
}
function formatDate(date) {
	if (Number.isNaN(date.getTime())) return "";
	return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
}
function text(value) {
	return value === null || value === void 0 ? "" : String(value);
}
//#endregion

//# sourceMappingURL=preExportGevisR.js.map