package ba.telegroup.university_system.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "school_subject", schema = "university_system_db", catalog = "")
@Inheritance(strategy = InheritanceType.JOINED)
public class SchoolSubject {
    private Integer id;
    private String name;
    private Timestamp createdAt;
    private Byte active;
    private Integer studyProgramId;
    private Integer ects;

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
    @Column(name = "name", nullable = false, length = 45)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "created_at", nullable = false)
    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Basic
    @Column(name = "active", nullable = false)
    public Byte getActive() {
        return active;
    }

    public void setActive(Byte active) {
        this.active = active;
    }

    @Basic
    @Column(name = "study_program_id", nullable = false)
    public Integer getStudyProgramId() {
        return studyProgramId;
    }

    public void setStudyProgramId(Integer studyProgramId) {
        this.studyProgramId = studyProgramId;
    }

    @Basic
    @Column(name = "ects", nullable = false)
    public Integer getEcts() {
        return ects;
    }

    public void setEcts(Integer ects) {
        this.ects = ects;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SchoolSubject that = (SchoolSubject) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(createdAt, that.createdAt) &&
                Objects.equals(active, that.active) &&
                Objects.equals(studyProgramId, that.studyProgramId) &&
                Objects.equals(ects, that.ects);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, createdAt, active, studyProgramId, ects);
    }
}
