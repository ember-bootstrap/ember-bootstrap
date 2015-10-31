module.exports = {
    normalizeEntityName: function() {
    },

    afterInstall: function() {
        return this.addBowerPackageToProject('bootstrap', '~3.3.5');
    }
};