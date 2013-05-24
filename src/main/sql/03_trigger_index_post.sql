/***************begin trigger for post**********************/
ALTER TABLE  xpsearchyao_schema.post  ADD COLUMN ttsv tsvector;
ALTER TABLE  xpsearchyao_schema.post  ADD COLUMN tsv tsvector;
ALTER TABLE  xpsearchyao_schema.post  ADD COLUMN btsv tsvector;
 
UPDATE  xpsearchyao_schema.post  SET ttsv =
     to_tsvector('english', coalesce(title,'') || ' ' );
     
UPDATE  xpsearchyao_schema.post  SET tsv =
		 setweight(to_tsvector('english', coalesce(title,'')),'A')||
		 setweight(to_tsvector('english', coalesce(body,'')),'C');
     
UPDATE  xpsearchyao_schema.post  SET btsv =
     to_tsvector('english', coalesce(body,'') || ' ' );
     
     
     
CREATE TRIGGER tsvectorupdatettsv BEFORE INSERT OR UPDATE
  ON  xpsearchyao_schema.post  FOR EACH ROW EXECUTE PROCEDURE
  tsvector_update_trigger(ttsv, 'pg_catalog.english', title);

CREATE TRIGGER tsvectorupdatebtsv BEFORE INSERT OR UPDATE
  ON  xpsearchyao_schema.post  FOR EACH ROW EXECUTE PROCEDURE
  tsvector_update_trigger(btsv, 'pg_catalog.english', body);
  
  
  CREATE FUNCTION post_trigger() RETURNS trigger AS $$
begin
  new.tsv :=
     setweight(to_tsvector('english', coalesce(new.title,'')), 'A') ||
     setweight(to_tsvector('english', coalesce(new.body,'')), 'C')
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdatebtsv BEFORE INSERT OR UPDATE
  ON  xpsearchyao_schema.post  FOR EACH ROW EXECUTE PROCEDURE
	post_trigger();
  
CREATE INDEX gin_index ON xpsearchyao_schema.post 
  USING gin(ttsv,btsv);
   
 
/***************end trigger for post**********************/     
     
/***************begin trigger for tag**********************/
CREATE OR REPLACE FUNCTION addtagpost() RETURNS trigger AS $addtagpost$
    BEGIN
       insert into xpsearchyao_schema.tagpost(tagid, postid)
    select new.id, id from xpsearchyao_schema.post where tsv @@ to_tsquery(new.name);
    return new;
    END;
$addtagpost$ LANGUAGE plpgsql;

CREATE TRIGGER addtagpost after INSERT OR UPDATE
  ON  xpsearchyao_schema.tag  FOR EACH ROW EXECUTE PROCEDURE
  addtagpost();
/***************end trigger for tag**********************/