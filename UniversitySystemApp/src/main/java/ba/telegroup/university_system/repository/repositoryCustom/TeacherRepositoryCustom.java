package ba.telegroup.university_system.repository.repositoryCustom;

import ba.telegroup.university_system.model.modelCustom.TeacherTitle;

import java.util.List;

public interface TeacherRepositoryCustom {


    List<TeacherTitle> getAllCustom();

    TeacherTitle getByIdCustom(Integer id);
}
