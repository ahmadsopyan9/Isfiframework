<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
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
        <!-- Login Template -->
        <h2>Login</h2>
        <form action="<?=base_url('auth/login');?>" method="POST">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Enter your password">
            </div>
            <?=crsf_token("form");?>
            <button type="submit" class="btn">Login</button>
            <div class="links">
                <a href="#register">Register</a> | <a href="#forgot-password">Forgot Password?</a>
            </div>
        </form>

        <!-- Register Template -->
        <h2 style="display:none;">Register</h2>
        <form action="<?=base_url('auth/register');?>" method="POST" style="display:none;">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required placeholder="Enter your name">
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Create a password">
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm_password" required placeholder="Confirm your password">
            </div>
            <?=crsf_token("form");?>
            <button type="submit" class="btn">Register</button>
            <div class="links">
                <a href="#login">Login</a>
            </div>
        </form>

        <!-- Forgot Password Template -->
        <h2 style="display:none;">Forgot Password</h2>
        <form action="<?=base_url('auth/forgot-password');?>" method="POST" style="display:none;">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="Enter your email">
            </div>
            <?=crsf_token("form");?>
            <button type="submit" class="btn">Reset Password</button>
            <div class="links">
                <a href="#login">Back to Login</a>
            </div>
        </form>
    </div>

    <?=flasher();?>
    <script src="<?=asset('frontend/js/main.js');?>"></script>
    <script>
        const activeForm = "<?=(!empty($active_form) ? $active_form : "");?>";
        const authTemplate = document.getElementById('auth-template');
        const headings = authTemplate.querySelectorAll('h2');
        const forms = authTemplate.querySelectorAll('form');
        const links = authTemplate.querySelectorAll('.links a');

        const hideForm = (fidx) => {
            for (let i = 0; i < fidx.length; i++) {
                headings[fidx[i]].style.display = 'none';
                forms[fidx[i]].style.display = 'none';
            }
        }

        const showForm = (fidx) => {
            for (let i = 0; i < fidx.length; i++) {
                headings[fidx[i]].style.display = 'block';
                forms[fidx[i]].style.display = 'block';
            }
        }


        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = link.getAttribute('href').replace('#', '');

                headings.forEach(heading => heading.style.display = 'none');
                forms.forEach(form => form.style.display = 'none');

                if (target === 'login') {
                    headings[0].style.display = 'block';
                    forms[0].style.display = 'block';
                } else if (target === 'register') {
                    headings[1].style.display = 'block';
                    forms[1].style.display = 'block';
                } else if (target === 'forgot-password') {
                    headings[2].style.display = 'block';
                    forms[2].style.display = 'block';
                }
            });
        });

        if(activeForm != "")
        {
            if (activeForm === 'register') {
                hideForm([0,2]);
                showForm([1]);
            } else if (activeForm === 'forgot_password') {
                hideForm([0,1]);
                showForm([2]);
            }   
        }
    </script>
</body>
</html>
