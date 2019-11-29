package ba.telegroup.university_system.model.modelCustom;

import ba.telegroup.university_system.model.Mark;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.util.Objects;

@SqlResultSetMapping(
        name = "MarkStudentSchoolSubjectTeacherMapping",
        classes = @ConstructorResult(
                targetClass = MarkStudentSchoolSubjectTeacher.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "value", type = Integer.class),
                        @ColumnResult(name = "student_id", type = Integer.class),
                        @ColumnResult(name = "school_subject_id", type = Integer.class),
                        @ColumnResult(name = "teacher_id", type = Integer.class),
                        @ColumnResult(name = "student_name", type = String.class),
                        @ColumnResult(name = "school_subject_name", type = String.class),
                        @ColumnResult(name = "teacher_name", type = String.class)
                }
        )
)

@MappedSuperclass
public class MarkStudentSchoolSubjectTeacher extends Mark {

    private String studentName;
    private String schoolSubjectName;
    private String teacherName;

    public MarkStudentSchoolSubjectTeacher() {
    }

    public MarkStudentSchoolSubjectTeacher(Integer id, Integer value, Integer studentId, Integer schoolSubjectId, Integer teacherId, String studentName, String schoolSubjectName, String teacherName) {
        super(id, value, studentId, schoolSubjectId, teacherId);
        this.studentName = studentName;
        this.schoolSubjectName = schoolSubjectName;
        this.teacherName = teacherName;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getSchoolSubjectName() {
        return schoolSubjectName;
    }

    public void setSchoolSubjectName(String schoolSubjectName) {
        this.schoolSubjectName = schoolSubjectName;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        MarkStudentSchoolSubjectTeacher that = (MarkStudentSchoolSubjectTeacher) o;
        return Objects.equals(studentName, that.studentName) &&
                Objects.equals(schoolSubjectName, that.schoolSubjectName) &&
                Objects.equals(teacherName, that.teacherName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), studentName, schoolSubjectName, teacherName);
    }
}