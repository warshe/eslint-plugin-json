/**
 * @fileoverview Lint JSON files
 * @author Azeem Bande-Ali
 * @copyright 2015 Azeem Bande-Ali. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");
var jshint = require("jshint");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


var fileContents = {};

// import processors
module.exports.processors = {
    // add your processors here
    ".json": {
        preprocess: function(text, fileName) {
            fileContents[fileName] = text;
            return [text];
        },
        postprocess: function(messages, fileName) {
            jshint.JSHINT(fileContents[fileName]);
            var data = jshint.JSHINT.data();
            var errors = (data && data.errors) || [];
            return errors.map(function(error) {
                return {
                    ruleId: "bad-json",
                    severity: 2,
                    message: error.reason,
                    source: error.evidence,
                    line: error.line,
                    column: error.character
                };
            });
        }
    }
};
