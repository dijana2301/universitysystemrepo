package ba.telegroup.university_system.repository.repositoryCustom;

import ba.telegroup.university_system.model.User;
import ba.telegroup.university_system.util.UserInformation;

public interface UserRepositoryCustom {
    User login(UserInformation userInformation);
}
