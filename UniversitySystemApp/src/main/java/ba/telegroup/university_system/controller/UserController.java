package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.User;
import ba.telegroup.university_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/hub/user")
@Scope("request")
public class UserController {
    private final UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping(value = "/")
    public List<User> getAll() {
        return userRepository.getAllByActive((byte) 1);
    }

    @GetMapping(value = "/{id}")
    public User getById(@PathVariable Integer id) {
        return userRepository.getById(id);
    }

    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public User insert(@RequestBody User user) {
        User insertedUser = userRepository.saveAndFlush(user);
        entityManager.refresh(insertedUser);
        System.out.println(insertedUser.getId());
        return insertedUser;
    }

    @Transactional
    @PutMapping(value = "/")
    public User update(@RequestBody User user) {
        if (userRepository.getById(user.getId()) != null) {
            user.setActive((byte) 1);
            User updatedUser = userRepository.saveAndFlush(user);
            entityManager.refresh(updatedUser);
            return updatedUser;
        }
        return null;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id) {
        User user = userRepository.getById(id);
        if (user != null) {
            user.setActive((byte) 0);
            userRepository.saveAndFlush(user);
            return "Success";
        } else
            return "Fail";

    }



    @SuppressWarnings("SameReturnValue")
    @GetMapping(value = "/logout")
    public @ResponseBody
    String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return "Success";
    }


}
