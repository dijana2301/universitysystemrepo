package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.College;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollegeRepository extends JpaRepository<College, Integer> {
    List<College> findAll();

    List<College> getAllByActive(Byte active);

    College getById(Integer id);
}
