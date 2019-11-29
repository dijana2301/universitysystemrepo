package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.Title;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TitleRepository extends JpaRepository<Title, Integer> {

    List<Title> findAll();
    Title getById(Integer id);
}
