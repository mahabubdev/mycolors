<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        <!--Author-->
        <meta name="author" content="mahabubdev">
        <meta name="author_url" content="https://github.com/mahabubdev">

        <title>MyColors</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <!--React App-->
        <div id="react"></div>

        <!-- Scripts -->
        <script src="{{ secure_asset('js/app.js') }}"></script>
    </body>
</html>
