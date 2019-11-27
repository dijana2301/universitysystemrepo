package ba.telegroup.university_system.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "teacher_school_subject", schema = "university_system_db", catalog = "")
public class TeacherSchoolSubject {
    private Integer id;
    private Integer teacherId;
    private Integer schoolSubjectId;

    @Id
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "teacher_id", nullable = false)
    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }

    @Basic
    @Column(name = "school_subject_id", nullable = false)
    public Integer getSchoolSubjectId() {
        return schoolSubjectId;
    }

    public void setSchoolSubjectId(Integer schoolSubjectId) {
        this.schoolSubjectId = schoolSubjectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeacherSchoolSubject that = (TeacherSchoolSubject) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(teacherId, that.teacherId) &&
                Objects.equals(schoolSubjectId, that.schoolSubjectId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, teacherId, schoolSubjectId);
    }
}
