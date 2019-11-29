package ba.telegroup.university_system.repository.repositoryCustom;

import ba.telegroup.university_system.model.modelCustom.CollegeUniversity;

import java.util.List;

public interface CollegeRepositoryCustom {

    List<CollegeUniversity> getAllCustom();

    CollegeUniversity getByIdCustom(Integer id);

}
