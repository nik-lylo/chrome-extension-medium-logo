/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on("before:browser:launch", (browser, launchOptions) => {
    launchOptions.extensions.push(
      "/home/chromane1/Extension/mediumLogoExtension"
    );
    return launchOptions;
  });
};
