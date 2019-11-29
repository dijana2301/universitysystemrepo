package ba.telegroup.university_system.repository.repositoryCustom;

import ba.telegroup.university_system.model.modelCustom.TeacherSchoolSubjectTeacherSchoolSubject;

import java.util.List;

public interface TeacherSchoolSubjectRepositoryCustom {
    List<TeacherSchoolSubjectTeacherSchoolSubject> getAllCustom();

    TeacherSchoolSubjectTeacherSchoolSubject getByIdCustom(Integer id);

}
