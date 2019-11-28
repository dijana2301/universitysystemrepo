package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.common.exception.ForbiddenException;
import ba.telegroup.university_system.model.User;
import ba.telegroup.university_system.repository.UserRepository;
import ba.telegroup.university_system.session.UserBean;
import ba.telegroup.university_system.util.UserInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")
@Scope("request")
public class SessionController {

    @Autowired
    private UserBean userBean;

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = {"/state"})
    public @ResponseBody
    User checkState(HttpServletResponse response) throws ForbiddenException {
        if (userBean.getLoggedIn()) {
            return userBean.getUser();
        } else {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            return null;
        }
    }

    @PostMapping(value = "/login")
    public @ResponseBody
    User login(@RequestBody UserInformation userInformation, HttpServletResponse response) throws ForbiddenException {
        User user = userRepository.login(userInformation);
        if (user == null) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            return null;
        } else {
            user.setPassword(null);
            userBean.setUser(user);
            userBean.setLoggedIn(true);

            return userBean.getUser();
        }
    }
}
