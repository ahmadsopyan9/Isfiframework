<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="_token" content="<?=crsf_token();?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
    <link rel="stylesheet" href="<?=asset('frontend/css/style.css');?>">
    <script src="<?=asset('plugins/jquery/dist/jquery.min.js'); ?>"></script>
</head>
<body>
    <div class="container">
        <h1><?= $title ?></h1>
        <div class="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum molestiae voluptatum amet facere illo perspiciatis esse nostrum, recusandae soluta quo eveniet ratione doloribus quam sunt officiis beatae quis dolorum quae.
            <div>
                <a href="<?=base_url('logout');?>">Logout</a>
            </div>
        </div>
    </div>
    

    <script src="<?=asset('plugins/alert/isAlert.min.js');?>"></script>
    <script src="<?=asset('frontend/js/main.js'); ?>"></script>
</body>
</html> 