<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page session="true" contentType="text/html; charset=GB2312" %>
<html>
<head>
    <meta charset="UTF-8">
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>��½</title>

</head>
<body>

<div class="container">
    <h1 class="text-center">����Ա��¼</h1>

    <div id="login-box">

        <h3>�������û���������</h3>
        <c:if test="${not empty error}">
            <div class="error">${error}</div>
        </c:if>
        <c:if test="${not empty msg}">
            <div class="msg">${msg}</div>
        </c:if>
        <form role="form" name='loginForm' action="<c:url value='/j_spring_security_check' />" method='POST'>
            <div class="form-group">
                <label for="name">�û���</label>
                <input type="text" class="form-control" id="name" name="j_username"
                       placeholder="�������û���">
            </div>
            <div class="form-group">
                <label for="password">����</label>
                <input type="password" class="form-control" id="password" name="j_password"
                       placeholder="����������">
            </div>
            <button type="submit" class="btn btn-default">��¼</button>
        </form>

    </div>

</div>


</body>
</html>