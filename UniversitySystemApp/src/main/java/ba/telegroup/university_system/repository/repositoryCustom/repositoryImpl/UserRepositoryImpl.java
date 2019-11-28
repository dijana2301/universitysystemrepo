package ba.telegroup.university_system.repository.repositoryCustom.repositoryImpl;

import ba.telegroup.university_system.model.User;
import ba.telegroup.university_system.repository.repositoryCustom.UserRepositoryCustom;
import ba.telegroup.university_system.util.UserInformation;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class UserRepositoryImpl implements UserRepositoryCustom {

    private static final String SQL_LOGIN = "SELECT DISTINCT u.* FROM university_system_db.user u WHERE u.active=1 AND u.username=? AND u.password=SHA2(?, 512)";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User login(UserInformation userInformation) {
        Query query = entityManager.createNativeQuery(SQL_LOGIN, User.class);
        query.setParameter(1, userInformation.getUsername());
        query.setParameter(2, userInformation.getPassword());
        List<User> userList = query.getResultList();
        if (userList == null || userList.isEmpty()) {
            return null;
        } else {
            return userList.get(0);
        }
    }
}
