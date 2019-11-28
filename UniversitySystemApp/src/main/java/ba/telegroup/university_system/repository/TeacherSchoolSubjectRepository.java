package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.TeacherSchoolSubject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherSchoolSubjectRepository extends JpaRepository<TeacherSchoolSubject, Integer> {
    List<TeacherSchoolSubject> findAll();

    TeacherSchoolSubject getById(Integer id);
}
