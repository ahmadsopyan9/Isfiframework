<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="_token" content="<?=crsf_token();?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Login to your account.">
    <meta name="keywords" content="Company Profile, Login Account">
    <title><?=$title;?></title>
    <link rel="icon" href="<?=favicon();?>" type="image/png">
    <script src="<?=asset('plugins/jquery/dist/jquery.min.js');?>"></script>
    <script src="<?=asset('plugins/alert/isAlert.min.js');?>"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #f0f4f8;
        }

        .container {
            width: 100%;
            max-width: 400px;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .container h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .form-group input:focus {
            border-color: #007bff;
            outline: none;
        }

        .btn {
            display: block;
            width: 100%;
            padding: 10px;
            background: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            text-align: center;
            cursor: pointer;
        }

        .btn:hover {
            background: #0056b3;
        }

        .links {
            text-align: center;
            margin-top: 15px;
        }

        .links a {
            color: #007bff;
            text-decoration: none;
        }

        .links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body id="mp" data-scr="<?=crsf_token();?>">
    <div class="container" id="auth-template">
        <!-- Reset password Template -->
        <h2>Reset Password</h2>
        <form action="" method="POST">
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Enter your new password">
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm_password" required placeholder="Confirm your new password">
            </div>
            <?=crsf_token("form");?>
            <button type="submit" class="btn">Reset Password</button>
        </form>
    </div>

    <?=flasher();?>
    <script src="<?=asset('frontend/js/main.js');?>"></script>
</body>
</html>
