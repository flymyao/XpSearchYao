package com.example.xpsearchyao.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.NodeList;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class DataReader {

    static String dataPath = new File("").getAbsolutePath()+"/tmp/imports/";

    public static List<Map> readXML(String path) {
    	path+="s.xml";
    	System.out.println(dataPath+path);
        List<Map> list = new ArrayList();
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = null;
            FileInputStream in = new FileInputStream(new File(dataPath+path));
            doc = db.parse(in);
            
            NodeList nList = doc.getElementsByTagName("row");
            for(int i = 0; i< nList.getLength() ; i ++){
                Element entityNode = (Element)nList.item(i);
                Map map = new HashMap();
                NamedNodeMap nameMap = entityNode.getAttributes();
                for (int index=0,length = nameMap.getLength();index<length;index++) {
                	map.put(nameMap.item(index).getNodeName().toLowerCase(),getString( nameMap.item(index).getNodeValue()));
                }
                list.add(map);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
        
        return list;
    }
    
	class SaxParseService extends DefaultHandler {
		private  List<Map> list = new ArrayList();
		@Override
		public void startElement(String uri, String localName, String qName,
				Attributes attributes) throws SAXException {
			Map map = new HashMap();
			for(int i = 0,j=attributes.getLength();i<j;i++){
				map.put(attributes.getQName(i).toLowerCase(),getString(attributes.getValue(i)));
			}
			list.add(map);
		}
		
		public List<Map> getResult(){
			return list;
		}
	}
   private static String getString(Object o){
	   if(o==null){
		   return "";
	   }
	   return o.toString().replaceAll("\'", "''");
   }
   
   public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException {
	   SAXParserFactory factory = SAXParserFactory.newInstance();  
       SAXParser parser = factory.newSAXParser();  
       DataReader.SaxParseService handler = new DataReader().new SaxParseService();  
       parser.parse("E:\\Workspaces\\jeremy\\XpSearchYao\\tmp\\imports\\Posts.xml",handler);
       System.out.println(handler.getResult().size());
}
}
