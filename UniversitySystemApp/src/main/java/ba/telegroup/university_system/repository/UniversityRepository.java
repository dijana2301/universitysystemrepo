package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UniversityRepository extends JpaRepository<University, Integer> {
    List<University> findAll();

    University getById(Integer id);
}
