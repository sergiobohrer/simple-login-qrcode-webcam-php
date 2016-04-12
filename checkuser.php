<?php 

if ( isset( $_POST['send'] ) )
{
    $arr = array();

    if ( preg_match("/Name: (.+)/", $_POST['credential'], $ret ) === 1 )
    {
        $arr['read'] = true;
        $arr['name'] = $ret[1];
        $arr['status'] = false;

        if ( strtoupper( $ret[1] ) == 'SERGIO' )
        {
            $arr['status'] = true;
        }
    }

    echo json_encode( $arr );
}