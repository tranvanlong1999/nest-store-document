/**
 * Docusaurus plugin to configure PostCSS for Tailwind CSS v4
 */
module.exports = function tailwindPlugin(context, options) {
    return {
        name: 'docusaurus-tailwindcss-v4',
        configurePostCss(postcssOptions) {
            // Add Tailwind v4 PostCSS plugin
            postcssOptions.plugins.push(require('@tailwindcss/postcss'));
            return postcssOptions;
        },
    };
};
