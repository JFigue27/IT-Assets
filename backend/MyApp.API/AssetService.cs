using MyApp.Logic.Entities;
using MyApp.Logic;
using Reusable.Rest;
using ServiceStack;
using ServiceStack.OrmLite;
using System;
using System.Threading.Tasks;
using ServiceStack.Text;
using Reusable.Rest.Implementations.SS;

namespace MyApp.API
{
    // [Authenticate]
    public class AssetService : BaseService<AssetLogic>
    {
        #region Endpoints - Generic Read Only
        public object Get(GetAllAssets request)
        {
            return WithDb(db => Logic.GetAll());
        }

        public object Get(GetAssetById request)
        {
            return WithDb(db => Logic.GetById(request.Id));
        }

        public object Get(GetAssetWhere request)
        {
            return WithDb(db => Logic.GetSingleWhere(request.Property, request.Value));
        }

        public object Get(GetPagedAssets request)
        {
            return WithDb(db => Logic.GetPaged(
                request.Limit,
                request.Page,
                request.FilterGeneral));
        }
        #endregion

        #region Endpoints - Generic Write
        public object Post(CreateAssetInstance request)
        {
            return WithDb(db => {
                var entity = request.ConvertTo<Asset>();
                return new HttpResult(new CommonResponse(Logic.CreateInstance(entity)))
                {
                    ResultScope = () => JsConfig.With(new Config { IncludeNullValues = true })
                };
            });
        }

        public object Post(InsertAsset request)
        {
            var entity = request.ConvertTo<Asset>();
            return InTransaction(db => {
                Logic.Add(entity);
                return new CommonResponse(Logic.GetById(entity.Id));
            });
        }

        public object Put(UpdateAsset request)
        {
            var entity = request.ConvertTo<Asset>();
            return InTransaction(db => {
                Logic.Update(entity);
                return new CommonResponse(Logic.GetById(entity.Id));
            });
        }
        public object Delete(DeleteAsset request)
        {
            var entity = request.ConvertTo<Asset>();
            return InTransaction(db => {
                Logic.Remove(entity);
                return new CommonResponse();
            });
        }
        #endregion

        #region Endpoints - Specific
        ///start:slot:endpoints<<<///end:slot:endpoints<<<
        #endregion
    }

    #region Specific
    ///start:slot:endpointsRoutes<<<///end:slot:endpointsRoutes<<<
    #endregion

    #region Generic Read Only
    [Route("/Asset", "GET")]
    public class GetAllAssets : GetAll<Asset> { }

    [Route("/Asset/{Id}", "GET")]
    public class GetAssetById : GetSingleById<Asset> { }

    [Route("/Asset/GetSingleWhere", "GET")]
    [Route("/Asset/GetSingleWhere/{Property}/{Value}", "GET")]
    public class GetAssetWhere : GetSingleWhere<Asset> { }

    [Route("/Asset/GetPaged/{Limit}/{Page}", "GET")]
    public class GetPagedAssets : GetPaged<Asset> { }
    #endregion

    #region Generic Write
    [Route("/Asset/CreateInstance", "POST")]
    public class CreateAssetInstance : Asset { }

    [Route("/Asset", "POST")]
    public class InsertAsset : Asset { }

    [Route("/Asset", "PUT")]
    public class UpdateAsset : Asset { }

    [Route("/Asset", "DELETE")]
    [Route("/Asset/{Id}", "DELETE")]
    public class DeleteAsset : Asset { }
    #endregion
}
