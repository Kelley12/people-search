using GenFu;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Primitives;
using Moq;
using PeopleSearch.Controllers;
using PeopleSearch.Models;
using PeopleSearch.Services;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Xunit;

namespace PeopleSearch.Tests
{
    public class PeopleControllerTest
    {
        private PeopleController _controller;
        private Mock<IPeopleService> _service;

        public PeopleControllerTest()
        {
            _service = new Mock<IPeopleService>();
            _controller = new PeopleController(_service.Object);
        }

        [Fact]
        public void Get_All_People_Success()
        {
            var people = A.ListOf<Person>(10).AsQueryable();
            _service.Setup(x => x.GetPeople()).Returns(people);

            var result = _controller.GetPeople() as IEnumerable<Person>;

            Assert.NotNull(result);
            Assert.Equal(10, result.Count());
        }

        [Fact]
        public void Search_People_Empty_String()
        {
            string searchString = "";
            var people = A.ListOf<Person>(10).AsQueryable();
            _service.Setup(x => x.SearchPeople(searchString)).Returns(people);

            var result = _controller.GetPeople(searchString) as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);

            var model = result.Value as IEnumerable<Person>;

            Assert.NotNull(model);
            Assert.Equal(10, model.Count());
        }

        [Fact]
        public void Upload_Image_Success()
        {
            var file = new Mock<IFormFile>();
            var savePath = "/path/to/image";
            _service.Setup(x => x.SavePicture(file.Object, "path")).Returns(savePath);

            _controller.ControllerContext = this.RequestWithFile(1);
            var result = _controller.UploadImage() as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
        }

        [Fact]
        public void Upload_Image_BadRequest()
        {
            var file = new Mock<IFormFile>();
            var savePath = "/path/to/image";
            _service.Setup(x => x.SavePicture(file.Object, "path")).Returns(savePath);

            _controller.ControllerContext = this.RequestWithFile(0);
            var result = _controller.UploadImage() as BadRequestResult;

            Assert.NotNull(result);
            Assert.Equal(400, result.StatusCode);
        }

        [Fact]
        public void Upload_Image_ServerError()
        {
            var file = new Mock<IFormFile>();
            var savePath = "/path/to/image";
            _service.Setup(x => x.SavePicture(file.Object, "path")).Returns(savePath);

            var result = _controller.UploadImage() as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(500, result.StatusCode);
        }

        private ControllerContext RequestWithFile(long length)
        {
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers.Add("Content-Type", "multipart/form-data");
            var file = new FormFile(new MemoryStream(Encoding.UTF8.GetBytes("Dummy file")), 0, length, "Data", "dummy.jpg");
            httpContext.Request.Form = new FormCollection(new Dictionary<string, StringValues>(), new FormFileCollection { file });
            var actx = new ActionContext(httpContext, new RouteData(), new ControllerActionDescriptor());
            return new ControllerContext(actx);
        }

        [Fact]
        public void Add_New_Person()
        {
            var person = A.New<Person>();
            _service.Setup(x => x.AddPerson(person));

            var result = _controller.PostPerson(person) as CreatedAtActionResult;

            Assert.NotNull(result);
            Assert.Equal(201, result.StatusCode);
        }
}
}
