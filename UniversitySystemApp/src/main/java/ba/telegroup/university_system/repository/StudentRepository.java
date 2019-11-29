package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.Student;
import ba.telegroup.university_system.repository.repositoryCustom.StudentRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer>, StudentRepositoryCustom {

    List<Student> findAll();
    List<Student> getAllByActive(Byte active);
    Student getById(Integer id);
}
