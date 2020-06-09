<?php
include("inc/common.php");
include("inc/verify_user.php");

$error=null;
$res=array ("status" => "ok");
$data = file_get_contents("php://input");
$boat=json_decode($data);

$location = $boat->location;
$rodb->begin_transaction();
error_log("boat update brand ".json_encode($boat));

$stmt = $rodb->prepare("UPDATE Boat SET brand=? WHERE Boat.name=?") or dbErr($rodb,$res,"prep"); 
$stmt->bind_param('ss', $boat->brand,$boat->name) || dbErr($rodb,$res,"bind");
$stmt->execute() ||  dbErr($rodb,$res,"exe");
$rodb->commit();
$rodb->close();
invalidate('boat');
echo json_encode($res);
