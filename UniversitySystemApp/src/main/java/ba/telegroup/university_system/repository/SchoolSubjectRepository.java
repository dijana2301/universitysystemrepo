package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.SchoolSubject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchoolSubjectRepository extends JpaRepository<SchoolSubject, Integer> {
    List<SchoolSubject> findAll();

    List<SchoolSubject> getAllByActive(Byte active);

    SchoolSubject getById(Integer id);
}
