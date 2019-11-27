package ba.telegroup.university_system.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "mark")
public class Mark {
    private Integer id;
    private Integer value;
    private Integer studentId;
    private Integer schoolSubjectId;
    private Integer teacherId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "value", nullable = false)
    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    @Basic
    @Column(name = "student_id", nullable = false)
    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    @Basic
    @Column(name = "school_subject_id", nullable = false)
    public Integer getSchoolSubjectId() {
        return schoolSubjectId;
    }

    public void setSchoolSubjectId(Integer schoolSubjectId) {
        this.schoolSubjectId = schoolSubjectId;
    }

    @Basic
    @Column(name = "teacher_id", nullable = false)
    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Mark mark = (Mark) o;
        return Objects.equals(id, mark.id) &&
                Objects.equals(value, mark.value) &&
                Objects.equals(studentId, mark.studentId) &&
                Objects.equals(schoolSubjectId, mark.schoolSubjectId) &&
                Objects.equals(teacherId, mark.teacherId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, value, studentId, schoolSubjectId, teacherId);
    }
}
