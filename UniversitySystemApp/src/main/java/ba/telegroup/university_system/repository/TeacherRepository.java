package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.Teacher;
import ba.telegroup.university_system.repository.repositoryCustom.TeacherRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Integer>, TeacherRepositoryCustom {

    List<Teacher> findAll();

    List<Teacher> getAllByActive(Byte active);
    Teacher getById(Integer id);
}
