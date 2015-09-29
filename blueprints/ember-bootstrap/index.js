module.exports = {
   normalizeEntityName: function() {
   },

   afterInstall: function() {
       return this.addBowerPackageToProject('waves', '~0.7.2');
   }
};
