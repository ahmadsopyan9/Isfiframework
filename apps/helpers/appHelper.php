<?php defined('_ROOT_') OR exit('No direct script access allowed');

function gSettings()
{
	$builder = new DbBuilder();
	$settings = $builder->table('general_settings')->select('*')->rowObject();
	return $settings;
}

function logo()
{
	$settings = gSettings();
	$logo = $settings->logo;
	return base_url("uploads/logo/".$logo);
}

function favicon()
{
	$settings = gSettings();
	$favicon = $settings->favicon;
	return base_url("uploads/logo/".$favicon);
}

function companyName()
{
	$settings = gSettings();
	$companyName = $settings->company_name;
	return $companyName;
}

function companyAddress()
{
	$settings = gSettings();
	$companyAddress = $settings->address;
	return $companyAddress;
}

function companyPhone()
{
	$settings = gSettings();
	$companyPhone = $settings->phone;
	return $companyPhone;
}

function companyEmail()
{
	$settings = gSettings();
	$companyEmail = $settings->email;
	return $companyEmail;
}

