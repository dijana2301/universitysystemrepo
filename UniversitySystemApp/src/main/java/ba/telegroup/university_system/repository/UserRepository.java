package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.User;
import ba.telegroup.university_system.repository.repositoryCustom.UserRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer>, UserRepositoryCustom {

    List<User> findAll();

    List<User> getAllByActive(Byte active);
    User getById(Integer id);
}
