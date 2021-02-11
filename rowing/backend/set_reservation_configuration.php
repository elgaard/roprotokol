<?php
include("inc/common.php");
include("inc/verify_user.php");
$rc = json_decode(file_get_contents("php://input"));
error_log(print_r($rc,true));
$stmt=$rodb->prepare("UPDATE reservation_configuration SET selected=? WHERE name=?") or dbErr($rodb,$res,"p set res conf");
error_log("Reservationskonfiguration for ".$rc->name." sat til ".$rc->selected." af $cuser");
$sel=$rc->selected;
$rname=$rc->name;
$stmt->bind_param('is',$sel,$rname) || dbErr($rodb,$res,"SET res conf");
$stmt->execute() || dbErr($rodb,$res,"set res conf");
eventLog("Reservationskonfiguration for ".$rc->name." sat til ".$rc->selected." af $cuser");
$rodb->close();
invalidate('status');
invalidate('admin');
invalidate('reservation');
echo json_encode($res);
