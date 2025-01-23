<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found</title>
    <style>
        /* General Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #3b82f6, #6366f1);
            overflow: hidden;
            color: #ffffff;
            text-align: center;
        }

        h1 {
            font-size: 6rem;
            font-weight: bold;
            animation: float 2.5s infinite ease-in-out;
        }

        p {
            font-size: 1.5rem;
            margin: 20px 0;
            color: rgba(255, 255, 255, 0.9);
        }

        a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            font-size: 1.2rem;
            font-weight: bold;
            color: #3b82f6;
            background: #ffffff;
            border-radius: 30px;
            text-decoration: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, background 0.3s ease;
        }

        a:hover {
            background: #f1f5f9;
            transform: translateY(-4px);
        }

        .animation-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }

        .animation-container .circle {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            animation: bounce 6s infinite ease-in-out;
        }

        .circle-1 {
            width: 150px;
            height: 150px;
            top: -30px;
            left: -50px;
            animation-delay: 0.5s;
        }

        .circle-2 {
            width: 200px;
            height: 200px;
            bottom: -40px;
            right: -60px;
            animation-delay: 1.5s;
        }

        .circle-3 {
            width: 100px;
            height: 100px;
            top: 200px;
            right: 50px;
            animation-delay: 2.5s;
        }

        /* Keyframe Animations */
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            h1 {
                font-size: 4rem;
            }

            p {
                font-size: 1.2rem;
            }

            a {
                font-size: 1rem;
                padding: 10px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="animation-container">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <a href="<?=base_url();?>">Go Back Home</a>
        <!-- Decorative Circles -->
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
    </div>
</body>
</html>
