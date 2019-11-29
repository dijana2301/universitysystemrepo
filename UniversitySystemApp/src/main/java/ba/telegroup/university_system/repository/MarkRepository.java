package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.Mark;
import ba.telegroup.university_system.repository.repositoryCustom.MarkRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarkRepository extends JpaRepository<Mark, Integer>, MarkRepositoryCustom {

    List<Mark> findAll();
    Mark getById(Integer id);
}
