$( document).ready(function(){
    $( '.a-sidebar-ie').each( function( i, e) {
        $( this).bind( 'click', function( event) {
            event.preventDefault();
            $( '#myiframe')[0].src = 'http://' + e.id;
        });
    });
})
