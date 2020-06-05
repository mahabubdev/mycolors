<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible">
    <title>{{ $name }}</title>
    <style>
        * { margin: 5px; padding: 5px; box-sizing: border-box }
        .email-container {
            width: 90%; margin: 5px auto;
            color: #4a4a4a; background: #EDEDED;
        }
        .codey{ color: #FFFFFF; background: #513FDD; display: block; padding: 20px 5px; }
    </style>
</head>
<body>
    <div class="email-container">
        {{!! $body !!}}
    </div>
</body>
</html>