package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    List<Teacher> findAll();

    Teacher getById(Integer id);
}
