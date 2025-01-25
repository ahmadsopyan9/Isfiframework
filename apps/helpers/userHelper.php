<?php defined('_ROOT_') OR exit('No direct script access allowed');

function userSession()
{
	$isfi =& _instance();
	$ss = $isfi->session->get("app_session_log");
	return $ss;
}

function isLogin()
{
	$ss = userSession();
	return !empty($ss) ? true : false;
}

function isAdmin()
{
	$ss = userSession();
	return $ss["role"] == "admin" ? true : false;
}

function isAuthor()
{
	$ss = userSession();
	return $ss["role"] == "author" ? true : false;
}

function isUser()
{
	$ss = userSession();
	return $ss["role"] == "user" ? true : false;
}

function isPageFor($path="")
{
	$ss = userSession();
	$res = "auth/login";

	if(empty($ss["role"])) return $res;

	if($ss["role"] == "admin") {
		$res = "admin" . (!empty($path) ? "/".$path : "");
	}
	else if($ss["role"] == "user") {
		$res = "member" . (!empty($path) ? "/".$path : "");
	}
	else if($ss["role"] == "author") {
		$res = "dashboard" . (!empty($path) ? "/".$path : "");
	}
	
	return $res;
}