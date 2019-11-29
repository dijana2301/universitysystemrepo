package ba.telegroup.university_system.model.modelCustom;

import ba.telegroup.university_system.model.TeacherSchoolSubject;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.util.Objects;

@SqlResultSetMapping(
        name = "TeacherSchoolSubjectTeacherSchoolSubjectMapping",
        classes = @ConstructorResult(
                targetClass = TeacherSchoolSubjectTeacherSchoolSubject.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "teacher_id", type = Integer.class),
                        @ColumnResult(name = "school_subject_id", type = Integer.class),
                        @ColumnResult(name = "teacher_name", type = String.class),
                        @ColumnResult(name = "school_subject_name", type = String.class),

                }
        )
)

@MappedSuperclass
public class TeacherSchoolSubjectTeacherSchoolSubject extends TeacherSchoolSubject {

    private String teacherName;
    private String schoolSubjectName;

    public TeacherSchoolSubjectTeacherSchoolSubject() {
    }

    public TeacherSchoolSubjectTeacherSchoolSubject(Integer id, Integer teacherId, Integer schoolSubjectId, String teacherName, String schoolSubjectName) {
        super(id, teacherId, schoolSubjectId);
        this.teacherName = teacherName;
        this.schoolSubjectName = schoolSubjectName;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getSchoolSubjectName() {
        return schoolSubjectName;
    }

    public void setSchoolSubjectName(String schoolSubjectName) {
        this.schoolSubjectName = schoolSubjectName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        TeacherSchoolSubjectTeacherSchoolSubject that = (TeacherSchoolSubjectTeacherSchoolSubject) o;
        return Objects.equals(teacherName, that.teacherName) &&
                Objects.equals(schoolSubjectName, that.schoolSubjectName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), teacherName, schoolSubjectName);
    }
}
