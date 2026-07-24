using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Xml;

namespace WebFox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class XxeTest1 : ControllerBase
    {

        [HttpGet("{xmlString}")]
        public void DoXxe(String xmlString)
        {
            var settings = new XmlReaderSettings
            {
                DtdProcessing = DtdProcessing.Prohibit,
                XmlResolver = null
            };

            using (var reader = XmlReader.Create(new StringReader(xmlString), settings))
            {
                var xmlDoc = new XmlDocument
                {
                    XmlResolver = null
                };
                xmlDoc.Load(reader);
            }
        }
    }
}
