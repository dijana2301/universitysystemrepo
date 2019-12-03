package ba.telegroup.university_system.repository.repositoryCustom.repositoryImpl;

import ba.telegroup.university_system.model.modelCustom.MarkStudentSchoolSubjectTeacher;
import ba.telegroup.university_system.repository.repositoryCustom.MarkRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class MarkRepositoryImpl implements MarkRepositoryCustom {

    private static final String SQL_GET_ALL_CUSTOM = "select m.*, CONCAT(s.first_name, ' ', s.last_name) as student_name, ss.`name` as school_subject_name, CONCAT(t.first_name, ' ', t.last_name) as teacher_name from mark m inner join student s on m.student_id = s.id  inner join school_subject ss on m.school_subject_id = ss.id inner join teacher t on m.teacher_id = t.id where s.active=1 and ss.active=1 and t.active=1";
    private static final String SQL_GET_BY_ID_CUSTOM = "select m.*, CONCAT(s.first_name, ' ', s.last_name) as student_name, ss.`name` as school_subject_name, CONCAT(t.first_name, ' ', t.last_name) as teacher_name from mark m inner join student s on m.student_id = s.id  inner join school_subject ss on m.school_subject_id = ss.id inner join teacher t on m.teacher_id = s.id where s.active=1 and ss.active=1 and t.active=1 and m.id=?";
    private static final String SQL_GET_BY_STUDENT_ID_CUSTOM = "select m.*, CONCAT(s.first_name, ' ', s.last_name) as student_name, ss.`name` as school_subject_name, CONCAT(t.first_name, ' ', t.last_name) as teacher_name from mark m inner join student s on m.student_id = s.id  inner join school_subject ss on m.school_subject_id = ss.id inner join teacher t on m.teacher_id = s.id where s.active=1 and ss.active=1 and t.active=1 AND s.id=?";

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<MarkStudentSchoolSubjectTeacher> getAllCustom() {
        Query query = entityManager.createNativeQuery(SQL_GET_ALL_CUSTOM, "MarkStudentSchoolSubjectTeacherMapping");
        return query.getResultList();
    }

    @Override
    public MarkStudentSchoolSubjectTeacher getByIdCustom(Integer id) {
        Query query = entityManager.createNativeQuery(SQL_GET_BY_ID_CUSTOM, "MarkStudentSchoolSubjectTeacherMapping");
        query.setParameter(1, id);
        if (query.getResultList() == null || query.getResultList().isEmpty())
            return null;
        return (MarkStudentSchoolSubjectTeacher) query.getResultList().get(0);
    }

    @Override
    public List<MarkStudentSchoolSubjectTeacher> getByStudentIdCustom(Integer studentId) {
        Query query = entityManager.createNativeQuery(SQL_GET_BY_STUDENT_ID_CUSTOM, "MarkStudentSchoolSubjectTeacherMapping");
        query.setParameter(1, studentId);

        return query.getResultList();
    }


}
