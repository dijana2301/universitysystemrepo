package ba.telegroup.university_system.model.modelCustom;


import ba.telegroup.university_system.model.SchoolSubject;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

@SqlResultSetMapping(
        name = "SchoolSubjectStudyProgramMapping",
        classes = @ConstructorResult(
                targetClass = SchoolSubjectStudyProgram.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "created_at", type = Date.class),
                        @ColumnResult(name = "active", type = Byte.class),
                        @ColumnResult(name = "study_program_id", type = Integer.class),
                        @ColumnResult(name = "ects", type = Integer.class),
                        @ColumnResult(name = "study_program_name", type = String.class),
                }
        )
)
@MappedSuperclass
public class SchoolSubjectStudyProgram extends SchoolSubject {

    private String studyProgramName;

    public SchoolSubjectStudyProgram() {
    }

    public SchoolSubjectStudyProgram(Integer id, String name, Date createdAt, Byte active, Integer studyProgramId, Integer ects, String studyProgramName) {
        super(id, name, createdAt != null ? new Timestamp(createdAt.getTime()) : null, active, studyProgramId, ects);
        this.studyProgramName = studyProgramName;
    }

    public String getStudyProgramName() {
        return studyProgramName;
    }

    public void setStudyProgramName(String studyProgramName) {
        this.studyProgramName = studyProgramName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        SchoolSubjectStudyProgram that = (SchoolSubjectStudyProgram) o;
        return Objects.equals(studyProgramName, that.studyProgramName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), studyProgramName);
    }
}
