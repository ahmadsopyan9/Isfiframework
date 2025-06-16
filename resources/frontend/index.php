<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
    <meta name="_token" content="<?=crsf_token();?>">
    <meta name="description" content="Home Page Description">
    <meta name="keywords" content="Home Page">
    <link rel="stylesheet" href="<?=asset('frontend/css/style.css');?>">
    <link rel="icon" href="<?=favicon();?>" type="image/png">
    <script src="<?=asset('plugins/jquery/dist/jquery.min.js');?>"></script>
    <script src="<?=asset('plugins/alert/isAlert.min.js');?>"></script>
</head>
<body>
    <div class="container">
        <h1><?= $title ?></h1>
        <div class="content">
            <?= $content ?>
        </div>
    </div>
    
    <script src="<?=asset('frontend/js/main.js'); ?>"></script>
</body>
</html> 