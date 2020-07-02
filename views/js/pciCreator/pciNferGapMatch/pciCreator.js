/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2017 (original work) Open Assessment Technologies SA;
 *
 */
define([
  "lodash",
  "pciNferGapMatch/creator/widget/Widget",
  "tpl!pciNferGapMatch/creator/tpl/markup",
], function (_, Widget, markupTpl) {
  "use strict";

  var _typeIdentifier = "pciNferGapMatch";

  var pciNferGapMatchCreator = {
    /**
     * (required) Get the typeIdentifier of the custom interaction
     *
     * @returns {String}
     */
    getTypeIdentifier: function () {
      return _typeIdentifier;
    },
    /**
     * (required) Get the widget prototype
     * Used in the renderer
     *
     * @returns {Object} Widget
     */
    getWidget: function () {
      return Widget;
    },
    /**
     * (optional) Get the default properties values of the pci.
     * Used on new pci instance creation
     *
     * @returns {Object}
     */
    getDefaultProperties: function () {
      return {
        shuffle: false,
      };
    },
    /**
     * (optional) Callback to execute on the
     * Used on new pci instance creation
     *
     * @returns {Object}
     */
    afterCreate: function (pci) {
      this.body(
        "<p>Lorem ipsum dolor sit amet, consectetur adipisicing ...*****************************</p>"
      );
      this.createChoice(); //gapMatchInteraction requires at least one gapMatch to be valid http://www.imsglobal.org/question/qtiv2p1/imsqti_infov2p1.html#element10307
      this.createResponse({
        baseType: "directedPair",
        cardinality: "multiple",
      });
    },
    /**
     * (required) Gives the qti pci xml template
     *
     * @returns {function} handlebar template
     */
    getMarkupTemplate: function () {
      return markupTpl;
    },
    /**
     * (optional) Allows passing additional data to xml template
     *
     * @returns {function} handlebar template
     */
    getMarkupData: function (pci, defaultData) {
      defaultData.prompt = pci.data("prompt");
      return defaultData;
    },

    getNextPlaceholder: function getNextPlaceholder() {
      var allChoices = this.getChoices(),
        existingChoicesLabels = _.map(allChoices, function (choice) {
          var choiceBody = choice.getBody() || {};
          return choiceBody.bdy;
        }),
        placeHolderIndex = 1,
        placeHolderPrefix = "choice #",
        placeHolder = placeHolderPrefix + placeHolderIndex;

      while (existingChoicesLabels.indexOf(placeHolder) !== -1) {
        placeHolderIndex++;
        placeHolder = placeHolderPrefix + placeHolderIndex;
      }
      return placeHolder;
    },

    createChoice: function (text) {
      var choice = new Choice();

      this.addChoice(choice);

      choice.body(text || this.getNextPlaceholder()).buildIdentifier("choice");

      if (this.getRenderer()) {
        choice.setRenderer(this.getRenderer());
      }

      event.choiceCreated(choice, this);

      return choice;
    },

    createGap: function (attr, body) {
      var choice = new Choice("", attr);

      this.addChoice(choice);
      choice.buildIdentifier("gap");
      choice.body(body);

      if (this.getRenderer()) {
        choice.setRenderer(this.getRenderer());
      }

      event.choiceCreated(choice, this);

      return choice;
    },

    removeChoice: function (element) {
      var serial = "",
        c;

      if (typeof element === "string") {
        serial = element;
      } else if (Element.isA(element, "gap")) {
        serial = element.serial;
      } else if (Element.isA(element, "gapText")) {
        serial = element.serial;
      }

      if ((c = this.getBody().getElement(serial))) {
        //remove choice
        this.getBody().removeElement(c);

        //update the response
        responseHelper.removeChoice(this.getResponseDeclaration(), c);

        //trigger event
        event.deleted(c, this);
      } else if ((c = this.getChoice(serial))) {
        //remove choice
        delete this.choices[serial];

        //update the response
        responseHelper.removeChoice(this.getResponseDeclaration(), c);

        //trigger event
        event.deleted(c, this);
      }
    },

    getGaps: function getGaps() {
      return this.getBody().getElements("gap");
    },

    getNormalMaximum: function getNormalMaximum() {
      return maxScore.gapMatchInteractionBased(this);
    },
  };

  //since we assume we are in a tao context, there is no use to expose the a global object for lib registration
  //all libs should be declared here
  return pciNferGapMatchCreator;
});
