$( document).ready(function(){
    $( '.a-sidebar-ie').each( function( i, e) {
        $( this).bind( 'click', function( event) {
            event.preventDefault();
            $("#page-wrapper").empty().append( '<iframe frameborder="0" height="2800" width="100%" src="http://'+e.id+'\"></iframe>')
        });
    });
})
