function slideShow() {
    Galleria.loadTheme('galleria/themes/classic/galleria.classic.min.js');
    Galleria.run($('.galleria'),{extend:function(){
        this.setOptions('transition','fade');
//		  this.play(3000);
    }});
}
